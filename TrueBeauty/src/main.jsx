import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./styles/styles.css";
import "./styles/home.css";
import "./styles/products.css";
import "./styles/product-detail.css";
import "./styles/register.css";
import "./styles/login.css";
import "./styles/contact.css";
import "./styles/about.css";
import "./styles/admin.css";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <App />
  </StrictMode>
);