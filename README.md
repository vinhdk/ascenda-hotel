<p style="text-align: center;">
  <img src="./public/favicon.svg" alt="Ascenda Logo" width="150">
</p>

# Ascenda Hotel Currencies & Price Competitiveness

A modern **Angular 19** application designed to analyze and compare hotel prices across different currencies. Built with **standalone components, signals, and Jest for testing**, this project ensures high performance and scalability.

## 📌 Features

- ✅ **Currency Comparison** – Compare hotel prices across multiple currencies.
- ✅ **Price Analysis** – Get insights into price competitiveness with interactive visualizations.
- ✅ **Fully Tested** – Ensures reliability with **Jest** unit tests.

---

## 🚀 Getting Started

Follow these steps to set up the project on your local machine.

---

## ⚡ Prerequisites

Ensure you have the following installed:

- **Node.js** (version 20 or later) – [Download Here](https://nodejs.org/) or use **NVM**
- **pnpm** (version 8 or later) – Install via:
  ```sh
  brew install pnpm  # macOS
  npm install -g pnpm # Windows/Linux
  ```

---

## 🔐 Configuring SSH & GPG for Secure Access

This repository **requires SSH for cloning** and **signed commits using GPG**.

- **Set up SSH**: Follow the official [GitHub SSH Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- **Set up GPG for signed commits**: Follow the [GitHub GPG Guide](https://docs.github.com/en/authentication/managing-commit-signature-verification)

---

## 🛠️ Setup

1. **Clone the Repository using SSH**

   ```sh
   git clone git@github.com:vinhdk/ascenda-hotel.git
   cd ascenda-hotel
   ```

2. **Install Dependencies**

   ```sh
   pnpm install
   ```

3. **Set Up Environment Variables** (if needed)  
   Create a `.env` file in the root directory and configure required API keys and settings.

---

## 🎯 Running the Project

### 🔥 Development Mode

```sh
pnpm start
```

This will start a local dev server at `http://localhost:4200/`.

### 🏗️ Build for Production

```sh
pnpm build
```

The production-ready files will be available in the [Browser](./dist/ascenda-hotel/browser) folder.

### 🧪 Running Tests

```sh
pnpm test
```

Runs unit tests using **Jest**.

---

## ⚙️ Tooling & Conventions

We are using the following tools and configurations to ensure code quality and maintainability:

- **pnpm** (version 8+) – Efficient package manager
- **Node.js** (version 20+) – Runtime environment
- **Prettier** – Code formatting
- **ESLint** – Linting for consistent code style
- **Husky** – Pre-commit and commit-msg hooks
- **Commitlint** – Enforces commit message conventions
- **Nx** – Monorepo management
- **Angular 19** – Frontend framework
- **Signed Commits** – All commits must be signed using **GPG**

---

## 📁 Project Structure

```plaintext
📂 ascenda-hotel
 ├── 📂 public (Static files, e.g., favicon, assets)
 ├── 📂 src
 │   ├── 📂 app
 │   │   ├── 📂 components
 │   │   ├── 📂 enums
 │   │   ├── 📂 injectors
 │   │   ├── 📂 interfaces
 │   │   ├── 📂 pipes
 │   │   ├── 📂 types
 │   │   ├── 📂 utils
 │   │   ├── app.config.ts
 │   │   └── app.component.ts
 │   ├── styles.scss
 │   ├── main.ts
 │   ├── index.html
 ├── 📜 package.json
 ├── 📜 package-lock.json
 ├── 📜 README.md
 ├── 📜 CONTRIBUTING.md
 ├── 📜 .npmrc
 ├── 📜 .prettierrc
 ├── 📜 eslint.config.mjs
 ├── 📜 jest.config.ts
 ├── 📜 tailwind.config.js
 ├── 📜 nx.json
 ├── 📜 project.json
 └── 📜 tsconfig.json
```

---

## 🏆 Contribution

- **Fork the repository** and create a new branch.
- Follow the project’s [Coding Standards](./CONTRIBUTING.md).
- Submit a **Pull Request** for review.

---

## 📧 Contact & Support

If you have any questions or issues, feel free to open an **issue** or reach out via email.

**✉️ Email**: [anlalayker@gmail.com](mailto:anlalayker@gmail.com)
