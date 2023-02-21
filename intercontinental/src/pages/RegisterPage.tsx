import { MouseEvent } from "react";
import InputBox from "../components/InputBox";
import TitleText from "../components/TitleText";
import useInput from "../hooks/useInput";

const RegisterPage = () => {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const onRegisterClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log(await result.json());

    result;
  };

  return (
    <div className="h-screen w-screen flex ">
      <div className="flex flex-col">
        <TitleText text="Fill in the following information." />
        <InputBox
          type={"text"}
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
        <InputBox
          type="password"
          label="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <button
          className="rounded-md px-2 py-1 bg-green-200 shadow-sm"
          onClick={onRegisterClick}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
