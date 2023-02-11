import { FC } from "react";

type TitleTextProps = {
  text: string;
  className?: string;
};

const TitleText: FC<TitleTextProps> = ({ text, className }) => {
  return <h1 className={`font-extrabold ${className}`}>{text}</h1>;
};

export default TitleText;
