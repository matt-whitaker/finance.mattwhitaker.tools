import {PropsWithChildren} from "react";
import classNames from "classnames";

export type GridTitleRowProps = { className?: string } & PropsWithChildren
export default function GridTitleRow({ children, className }: GridTitleRowProps) {
    return (
        <div className={classNames("content-center bg-primary bg-opacity-70 grid leading-8 pb-1", [className])}>
            {children}
        </div>
    )
}