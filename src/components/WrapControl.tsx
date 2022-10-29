import ClassNames from "@codevachon/classnames";
import { FC, ReactNode } from "react";

interface IWrapControlProps {
    className?: string | ClassNames;
    children: ReactNode;
    label?: string;
}

const WrapControl: FC<IWrapControlProps> = ({ className = "", children, label = "" }) => {
    return (
        <div className={new ClassNames(["flex flex-col space-y-1"]).add(className).list()}>
            <label className={new ClassNames(["font-semibold"]).list()}>{label}</label>
            <div>{children}</div>
        </div>
    );
};

export default WrapControl;
export { WrapControl };
