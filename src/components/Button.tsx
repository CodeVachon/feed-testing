import ClassNames from "@codevachon/classnames";
import { FC, ReactNode } from "react";

interface IButtonProps {
    className?: string;
    children: ReactNode;
    onClick: () => void;
}

const Button: FC<IButtonProps> = ({ className = "", children, onClick }) => {
    return (
        <button
            onClick={(e) => {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                if (onClick) {
                    onClick();
                }
            }}
            className={new ClassNames([
                "px-4 py-2",
                "rounded border bg-sky-800 text-lg font-semibold text-white"
            ]).list()}
        >
            {children}
        </button>
    );
};

export default Button;
export { Button };
