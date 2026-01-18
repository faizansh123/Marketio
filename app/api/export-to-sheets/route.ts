import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

export async function POST(req: Request) {
    console.log("!!! EXPORT API HIT !!!");
    try {
        const { videoUrl, caption, hashtags } = await req.json();

        // 1. Check Credentials
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        const sheetId = "1UmnxaQqbzQ69rPX34SudkJ6bsdnnNK2rtUdciQ61wNg";

        if (!clientEmail || !privateKey) {
            console.error("MISSING CREDENTIALS");
            return NextResponse.json({ error: "Missing Google Credentials" }, { status: 500 });
        }

        // 2. Auth (Drive + Sheets)
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file', // Allow creating files
            ],
        });

        const drive = google.drive({ version: 'v3', auth });
        const sheets = google.sheets({ version: 'v4', auth });

        // 3. Upload Video to Drive
        let driveLink = "No Video";

        if (videoUrl && videoUrl.startsWith('data:video')) {
            console.log("Uploading video to Google Drive...");

            // Convert Base64 to Stream
            const base64Data = videoUrl.split(';base64,').pop();
            const buffer = Buffer.from(base64Data, 'base64');
            const stream = Readable.from(buffer);

            const fileMetadata = {
                name: `Marketio_Video_${Date.now()}.mp4`,
                parents: [], // Upload to root (or specify folder ID)
            };

            const media = {
                mimeType: 'video/mp4',
                body: stream,
            };

            const driveResponse = await drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id, webViewLink',
            });
            console.log("Drive Upload Success:", driveResponse.data);

            driveLink = driveResponse.data.webViewLink || "Upload Failed";
            console.log("Video uploaded! Link:", driveLink);

            // Make it readable to anyone with the link (Optional, dependent on user pref)
            // For now, we'll assume the user has access via the service account or it's fine private
            await drive.permissions.create({
                fileId: driveResponse.data.id!,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                },
            });

        } else {
            console.warn("Invalid videoUrl format, skipping Drive upload.");
        }

        // 4. Append to Sheets
        const date = new Date().toISOString();
        const hashtagsString = Array.isArray(hashtags) ? hashtags.join(' ') : hashtags;

        const values = [
            [date, driveLink, caption, hashtagsString]
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: 'Sheet1!A:D',
            valueInputOption: 'USER_ENTERED',
            requestBody: { values },
        });

        return NextResponse.json({ success: true, driveLink });

    } catch (error: any) {
        console.error("FULL EXPORT ERROR:", JSON.stringify(error, null, 2));
        console.error("Message:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
