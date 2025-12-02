# BetterDash

**BetterDash** is a production-ready admin dashboard starter kit designed to accelerate your development. Built on the latest web standards, it combines the speed of **Vite** with the type-safety of **TanStack Router** and the flexibility of **Better Auth**.

![BetterDash](https://placehold.co/1200x600/png?text=BetterDash+Preview)

## 🚀 Features

- **Authentication**: Secure, fully typed authentication powered by **Better Auth**.
- **UI Components**: Beautiful, accessible components from **Shadcn UI**.
- **Routing**: Type-safe, file-based routing with **TanStack Router**.
- **Database**: Ready-to-use **Prisma** ORM setup.
- **Styling**: Modern styling with **Tailwind CSS v4**.
- **Modules**: Includes pre-built modules for Users, Tasks, Settings, and more.
- **Forms**: Robust form handling with **React Hook Form** and **Zod**.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Library**: [Shadcn UI](https://ui.shadcn.com/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **Database**: [Prisma](https://www.prisma.io/)
- **State Management**: [TanStack Query](https://tanstack.com/query) (via Router)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (recommended), npm, or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MuhammadNabeelNisarWorkspace/betterdash.git
    cd betterdash
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Setup:**

    Copy the example environment file and configure your variables (Database URL, Auth secrets, etc.).

    ```bash
    cp .env.example .env
    ```

4.  **Database Setup:**

    Push the Prisma schema to your database.

    ```bash
    pnpm db:push
    ```

5.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:3000`.

## 📜 Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the application for production.
- `pnpm start`: Preview the production build.
- `pnpm test`: Run tests with Vitest.
- `pnpm lint`: Lint the codebase.
- `pnpm format`: Format code with Prettier.
- `pnpm db:push`: Push Prisma schema changes to the database.
- `pnpm db:studio`: Open Prisma Studio to view/edit data.

## 📂 Project Structure

```
src/
├── assets/       # Static assets
├── components/   # Reusable UI components
├── features/     # Feature-based modules (auth, dashboard, users, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
├── routes/       # TanStack Router file-based routes
├── server-fn/    # Server-side functions
└── styles/       # Global styles
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
