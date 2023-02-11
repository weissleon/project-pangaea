import { FC } from "react";
import TitleText from "./TitleText";

const NavBar: FC = () => {
  return (
    <div className="w-screen h-14 bg-white shadow-md flex justify-center items-center">
      <TitleText text={"Pangaea"} />
    </div>
  );
};

export default NavBar;
