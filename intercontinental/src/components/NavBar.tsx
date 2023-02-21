import { FC, MouseEvent, useMemo } from "react";
import TitleText from "./TitleText";

type NavBarProps = {
  title?: string;
  actions?: NavBarActionProps[];
};

export type NavBarActionProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  name: string;
  position: "left" | "right";
};

const NavBar: FC<NavBarProps> = ({ actions = [], title = "" }) => {
  const rightActions: NavBarActionProps[] = useMemo(
    () => actions?.filter((action) => action.position === "right"),
    [actions]
  );
  const leftActions = useMemo(
    () => actions?.filter((action) => action.position === "left"),
    [actions]
  );
  return (
    <div className="w-screen h-14 bg-white shadow-md grid grid-cols-3 grid-rows-1">
      <section className="col-start-1 col-end-2">
        {leftActions.length === 0
          ? null
          : leftActions.map((action) => (
              <button onClick={action.onClick}>{action.name}</button>
            ))}
      </section>
      <section className="col-start-2 col-end-3 flex items-center justify-center">
        <TitleText text={title} />
      </section>
      <section className="col-start-3 col-end-4 flex items-center justify-end gap-x-4 pr-8">
        {rightActions.length === 0
          ? null
          : rightActions.map((action) => (
              <button onClick={action.onClick} key={action.name}>
                {action.name}
              </button>
            ))}
      </section>
    </div>
  );
};

export default NavBar;
