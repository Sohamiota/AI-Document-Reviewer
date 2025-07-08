📄 **Smart Document Reviewer**

An AI-powered web app that helps you **summarize**, **highlight**, and **understand complex documents** in seconds.

Live Demo: [https://v0-smart-document-reviewer.vercel.app](https://v0-smart-document-reviewer.vercel.app)

---

**What It’s All About**

This app saves you from spending hours reading long documents. Simply upload a text or file, and it will:

• Generate a clear, concise summary
• Highlight key points, insights, or potential issues
• Streamline decision-making with fast, reliable AI support

Ideal for students, professionals, researchers—anyone who needs to grasp detailed text quickly.

---

**Tech Stack Used**

An intelligent, modern tool built with:

• Frontend Framework: **Next.js 14 (App Router)**
• Programming Language: **TypeScript**
• Styling: **Tailwind CSS**
• AI Integration: **OpenAI GPT API** for summarization and point extraction ([reddit.com][1], [medium.com][2], [medium.com][3], [reddit.com][4])
• Hosting & Deployment: **Vercel**

---

**Folder Structure Overview**

smart-document-reviewer
│
├── app → Route definitions and layout components
│   └── api → Server-side endpoints for processing prompts
│   └── layout.tsx → Root UI layout
│
├── components → Reusable UI elements
├── hooks → Custom React hooks like useTextAnalysis
├── lib → Utility functions and API clients
├── public → Static assets (images, icons)
├── styles → Global CSS and Tailwind imports
├── .env → Environment variables for API credentials
├── tailwind.config.ts → Tailwind CSS setup
└── tsconfig.json → TypeScript configuration

---

**How to Run It Locally**

Step 1: Clone the repo
› git clone [https://github.com/Sohamiota/smart-document-reviewer.git](https://github.com/Sohamiota/smart-document-reviewer.git)
› cd smart-document-reviewer

Step 2: Install dependencies
› pnpm install

Step 3: Set up environment variables
› Create a `.env` file
› Add your OpenAI API key (e.g., OPENAI\_API\_KEY=your\_key\_here)

Step 4: Start the dev server
› pnpm dev

---

**Main Features**

• AI-powered document summarization
• Highlighted insights and key issues
• Clean, responsive interface
• Scalable, modular architecture
• Powered by GPT models for fast performance

---

**Future Plans**

• PDF and DOCX file support
• Multilingual capabilities
• AI-driven Q\&A about documents
• Export options (PDF/downloadable summaries)

---

**Author**

Built with care by **Sohamiota**
GitHub: [https://github.com/Sohamiota](https://github.com/Sohamiota)

