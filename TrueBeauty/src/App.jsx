import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <AppRoutes />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;