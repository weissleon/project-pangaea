import ReactDOM from "react-dom/client";
import LandingPage from "./pages/LandingPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import "./main.css";
import App from "./pages/App";
import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { element: <LandingPage />, index: true },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "sign_in",
        element: <SignInPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
