import {PropsWithChildren} from "react";
import classNames from "classnames";

export type GridPartitionRowProps = { className?: string; } & PropsWithChildren
export default function GridPartitionRow({ children, className }: GridPartitionRowProps) {
    return (
        <div className={classNames("content-center bg-primary bg-opacity-40 grid leading-8 py-0.5 px-1", [className])}>
            {children}
        </div>
    )
}