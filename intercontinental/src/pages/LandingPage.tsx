import { ChangeEvent, MouseEvent, useState } from "react";
import NavBar, { NavBarActionProps } from "../components/NavBar";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const TXT_BTN_SIGN_IN = "Sign In";

function LandingPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navBarActions: NavBarActionProps[] = [
    {
      name: "Sign In",
      onClick: () => {
        navigate("/sign_in");
      },
      position: "right",
    },
    {
      name: "Register",
      onClick: () => {
        navigate("/register");
      },
      position: "right",
    },
  ];

  const onSignInClick = async (event: MouseEvent<HTMLButtonElement>) => {
    console.log(account, password);

    const result = await fetch("http://localhost:8080/authenticate", {
      method: "POST",
      body: JSON.stringify({
        account,
        password,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
    });

    console.log(await result.json());
  };

  const onAccountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAccount(value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="h-screen w-screen bg-yellow-300"
    >
      <NavBar title="Pangaea" actions={navBarActions} />
      <div className="flex items-center justify-center relative h-[calc(100vh-56px)] w-screen bg-blue-200">
        <div className="h-32 relative gap-x-4 flex flex-col items-center justify-center px-4 bg-white shadow-sm">
          <div className="relative flex w-full">
            <label htmlFor="acc">Account:</label>
            <input
              id="acc"
              type="text"
              name="account"
              value={account}
              onChange={onAccountChange}
            />
          </div>
          <div className="mx-4 flex w-full">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <div>
            <button
              className="rounded-md px-2 py-1 bg-orange-400"
              onClick={onSignInClick}
            >
              {TXT_BTN_SIGN_IN}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default LandingPage;
