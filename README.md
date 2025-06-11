# 🛍️ Shop Me Mobile

A modern React Native e-commerce mobile app built with TypeScript. This app showcases clean architecture, reusable components, and a scalable folder structure — ideal for real-world production apps.

---

## 📁 Project Structure

Here's a simplified view of the folder structure inside the `src/` directory:

```bash
|-- android
├── 📁 ios
|-- src/
|   |-- assets/ # Images, fonts, icons, etc.
|   |
|   |-- components/ # Shared, reusable UI components
|   |  |-- Button/ # "Button" UI component
|   |  | |-- Button.tsx
|   |  | |-- Board.test.ts
|   |  | |-- types.ts
|   |  |
|   |  |-- ... # Other shared components
|   |
|   |-- features/ # App screens
|   |  |-- Home/ # Home screen module
|   |  | |-- components/ # Components only used in Home feature
|   |  | |-- screens/ # screens only used in Home feature
|   |  | |    |-- Home.tsx
|   |  | |    |-- Home.test.ts
|   |  | |-- HomeApi.ts # API's related to Home
|   |  | |-- HomeSlice.ts # SLice's related to Home
|   |  | |-- Helper.ts
|   |  | |-- types.ts # types only used in Home
|   |  |
|   |  |-- ... # Other features
|   |--services # baseApi and global API's
|   |-- store # redux store
|   |-- theme # theme related code
|   |-- navigation
|   |-- utils # global utils / helpers
|-- .gitignore
|-- package.json
|-- README.md
|-- App.tsx
|-- ... # Other root-level files (e.g., tsconfig.json, metro.config.js)
```

---

## 🚀 Scripts

The following scripts are available in the project for development and testing:

| Script                | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `npm run android`     | Launch the app on an Android emulator/device           |
| `npm run ios`         | Launch the app on an iOS simulator                     |
| `npm run lint`        | Run ESLint on the codebase to check code quality       |
| `npm start`           | Start the Metro bundler for React Native               |
| `npm test`            | Run unit tests with Jest                               |
| `npm run json-server` | Start a mock REST API using `json-server` on port 3000 |

> ℹ️ Make sure you have Android Studio or Xcode installed to run the app on a device/emulator.

---

## 📦 Tech Stack

- React Native (TypeScript)
- Styled Components
- Jest for testing
- ESLint for linting
- JSON Server for mock API

---

## 🧪 Testing

Run tests using:

```bash
npm test

```
