# ✨ Coding Standards

To maintain code quality and consistency, follow these guidelines when contributing to the project.

---

## 📌 Code Formatting

We enforce **Prettier** and **ESLint** rules for consistent formatting.

### ✅ Prettier Rules:

- Use **2 spaces** for indentation.
- Enforce **single quotes (`'`)** for strings.

### ✅ ESLint Rules:

- No **unused variables** allowed.

🔹 **Run formatting before committing:**

```sh
pnpm prettier --write .
```

---

## 🔖 Commit Message Guidelines

We follow **Conventional Commits** to keep a clean Git history.

### ✅ Commit Format:

```
<type>(<scope>): <message>
```

### ✅ Examples:

```sh
feat(auth): add login functionality
fix(ui): resolve button alignment issue
chore(deps): update dependencies
```

### 🔹 Allowed Commit Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no behavior change)
- `test`: Adding/modifying tests
- `chore`: Maintenance tasks (e.g., updating dependencies)

🔹 **Commit messages are validated using `commitlint`.**

### ✅ Signing Commits:

- Use **GPG** to sign your commits.
- Follow the [GitHub GPG Guide](https://docs.github.com/en/authentication/managing-commit-signature-verification).

---

## 🌿 Branch Naming Convention

Use the following format for branch names:

```
<type>/<short-description>
```

### ✅ Examples:

```
feat/add-user-profile
fix/login-redirect-bug
refactor/improve-api-service
```

🔹 **Allowed Branch Types:**

- `feat/` – New feature development
- `fix/` – Bug fixes
- `chore/` – Minor updates (dependencies, configs)
- `docs/` – Documentation changes
- `test/` – Testing improvements

---

## 🔥 Pull Request Guidelines

- Ensure all tests **pass** before creating a PR.
- Follow **code formatting** rules.
- Add **descriptive PR titles** and **clear descriptions**.
- Keep PRs **small and focused**.

---

## 🧪 Testing Standards

We use **Jest** for unit testing. Always write tests for new features and fixes.

### ✅ Running Tests:

```sh
pnpm test
```

### ✅ Writing Tests:

- **Test all critical logic paths.**
- **Use meaningful test descriptions.**
- **Ensure tests run independently.**

---

## 📢 Code Review Process

- PRs must be **approved by at least one reviewer** before merging.
- Reviewers check **code quality, readability, and test coverage**.
- If changes are requested, **update the PR** and re-request review.

---

## 🚀 Automation with Husky

We use **Husky** to enforce standards before commits:

| Hook         | Description                   |
| ------------ | ----------------------------- |
| `pre-commit` | Runs ESLint & Prettier checks |
| `commit-msg` | Enforces commit message rules |

---

Following these guidelines helps maintain a **clean, efficient, and scalable** codebase. Happy coding! 🚀
