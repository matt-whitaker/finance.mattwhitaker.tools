import {ChangeEvent, useCallback} from "react";
import classNames from "classnames";

export type InputPercentProps = { className?: string; weight: number; change: (weight: number) => void; };
export default function InputPercent({ className, weight, change }: InputPercentProps) {
    const onChange = useCallback(({ target: { value } }: ChangeEvent) => {
        const numStr = value.replace("%");
        const num: number = numStr.contains(".") ? parseFloat(numStr) : parseInt(numStr);
        change(num);
    }, [change]);

    return (
        <div className={classNames("self-center pl-1 pr-2 relative", [className])}>
            <input
                onChange={onChange}
                className="w-full input input-ghost input-xs text-right pr-6 relative top-[-1px]"
                type="text"
                value={`${weight.toFixed(2)}`}
            />
            <label className="h-full absolute right-4 top-[2px] text-xs leading-10 flex items-center pb-0.5">%</label>
        </div>
    );
}