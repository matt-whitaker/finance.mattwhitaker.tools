import classNames from "classnames";
import {PropsWithChildren} from "react";
import NavBar from "../navbar";

export type ShellProps = PropsWithChildren & { className?: string }
export default function Shell({ children, className }: ShellProps) {
    return (
        <div className={classNames([className])}>
            <NavBar />
            <div className="mt-8 mx-auto max-w-screen-lg">
                {children}
            </div>
        </div>
    );
}