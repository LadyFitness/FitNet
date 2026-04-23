import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);

export default app;