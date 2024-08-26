import {PropsWithChildren} from "react";
import classNames from "classnames";

export type GridLayoutProps = { className?: string; bordered?: boolean } & PropsWithChildren
export default function GridLayout({ children, className, bordered = false }: GridLayoutProps) {
    return (
        <div className={classNames({ "border-r-4 border-secondary border-double": bordered }, [className])}>
            {children}
        </div>
    );
}