import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />

      <Routes>
        <Route exact path="/" element={<Contact />} />
        <Route exact path="/products/:id" element={<Products />} />
        <Route exact path="/products" element={<Contact />} />
        {/* <Navigate to="/" element={<ErrorPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
