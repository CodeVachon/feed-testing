import { ClassNames } from "@codevachon/classnames";
import { FC, ReactNode } from "react";

export const SectionHeading: FC<{ className?: string | ClassNames; children: ReactNode }> = ({
    className = "",
    children
}) => <h2 className={new ClassNames(["text-lg font-bold"]).add(className).list()}>{children}</h2>;
