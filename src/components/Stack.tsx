import ClassNames from "@codevachon/classnames";
import { FC, ReactNode } from "react";

interface IStackProps {
    className?: string;
    children: ReactNode;
}

const Stack: FC<IStackProps> = ({ className = "", children }) => {
    return <div className={new ClassNames(["flex flex-col space-y-4"]).list()}>{children}</div>;
};

export default Stack;
export { Stack };
