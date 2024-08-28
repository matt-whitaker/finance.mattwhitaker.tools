import {PropsWithChildren} from "react";
import classNames from "classnames";

export type GridPositionRowProps = { className?: string } & PropsWithChildren
export default function GridPositionRow({ className, children }: GridPositionRowProps) {
    return (
        <div className={classNames("grid leading-8 py-0.5 px-1", [className])}>
            {children}
        </div>
    );
}