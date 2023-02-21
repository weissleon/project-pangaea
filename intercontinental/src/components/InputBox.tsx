import { FC, HTMLInputTypeAttribute, useMemo } from "react";

type InputBoxProps = {
  label: string;
  type: HTMLInputTypeAttribute;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const InputBox: FC<InputBoxProps> = ({ label, type, value, onChange }) => {
  const idAndName = useMemo(
    () => label.toLowerCase().replace(" ", "-"),
    [label]
  );

  return (
    <div className="flex flex-x-2">
      <label className="min-w-[100px]" htmlFor={idAndName}>
        {`${label}:`}
      </label>
      <input
        className="flex-1"
        type={type}
        name={idAndName}
        id={idAndName}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
