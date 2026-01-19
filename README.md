# Marketio | AI Growth & UGC 🚀

Marketio is an intelligent AI agent designed to revolutionize how businesses create short-form marketing content. It automatically transforms emerging social media trends into high-performing generic User Generated Content (UGC) scripts and videos, helping brands stay relevant and engaging without the manual legwork.

## 🌟 Features

*   **Trend-to-Script Conversion**: Analyzes social media trends and converts them into actionable UGC marketing scripts (`ugc-script-generator`).
*   **AI Video & Image Generation**:
    *   Automated script-to-video creation (`generate-video`).
    *   AI-powered image generation for visual assets (`generate-image`).
*   **Workflow Automation**: Streamlines the content creation pipeline (`workflow`).
*   **Data Export**: export your campaign data directly to spreadsheets (`export-to-sheets`).
*   **Interactive Chat**: Refine your content strategy through an AI chat interface.


## 🛠️ Tech Stack

**Frameworks & Core:**
*   Next.js 16 - The React Framework for the Web.
*   React 19 - For building user interfaces.
*   TypeScript - For type safety.

**Styling & UI:**
*   Tailwind CSS v4 - Utility-first CSS framework.
*   Framer Motion - For React animations.
*   GSAP - For high-performance animations.
*   Lucide React - Beautiful & consistent icons.
*   Next Themes - Dark mode support.

**AI & Workflow Automation:**
*   N8N - for backend workflow automation.
*   Google Generative AI (Gemini) - For multimodal AI capabilities.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/faizansh123/Marketio.git
    cd uofthacks13
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory. You will need to add your API keys for the AI services used (OpenAI, Google Gemini, etc.).
    
    Example `.env.local` structure:
    ```env
    OPENAI_API_KEY=your_openai_key_here
    GOOGLE_API_KEY=your_google_ai_key_here
    # Add other necessary keys based on the api/ codebase
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit http://localhost:3000 in your browser.

## 📂 Project Structure

*   **/app**: Contains the main application routes and API endpoints.
    *   `/api`: Backend logic for image/video generation, chat, and workflows.
    *   `/results`: Page for displaying generated content.
    *   `/analysis`: Trend analysis features.
*   **/components**: Reusable UI components (Hero, Navbar, Features, etc.).
*   **/public**: Static assets.

---
Built for UofTHacks 13.
