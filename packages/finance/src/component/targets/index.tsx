import Schema from "../../model/schema.ts";
import Position from "../../model/position.ts";
import GridTitleRow from "../grid-title-row";
import {Fragment} from "react";
import GridPartitionRow from "../grid-partition-row";
import GridPositionRow from "../grid-position-row";
import classNames from "classnames";
import GridLayout from "../grid-layout";
import useFormats from "../useFormats.ts";

export type TargetsProps = { schema: Schema; positions: Map<string, Position>; totalValue: number; className?: string; }
export default function Targets({ schema, totalValue, className }: TargetsProps) {
    const { dollar } = useFormats();

    return (
        <GridLayout className={classNames("w-[120px]", [className])}>
            <GridTitleRow className="text-right">
                <div className="col-start-1 col-span-1 pr-1">{dollar(totalValue)}</div>
            </GridTitleRow>
            {schema.partitions.map((partition) => {
                const partitionTotal = (partition.weight / 100) * totalValue;
                return (
                    <Fragment key={partition.name}>
                        <GridPartitionRow className="text-right grid-cols-1">
                            <div className="col-start-1 col-span-1 pr-1">{dollar(partitionTotal)}</div>
                        </GridPartitionRow>
                        {partition.positions.map((position, j) => (
                            <GridPositionRow key={position.symb} className={classNames("text-right grid-cols-1", [(j % 2) ? "bg-primary bg-opacity-15" : "bg-primary bg-opacity-5"])}>
                                <div className="col-start-1 col-span-1 pr-1">{dollar((partition.weight / 100) * (position.weight / 100) * totalValue)}</div>
                            </GridPositionRow>
                        ))}
                    </Fragment>
                )
            })}
        </GridLayout>
    )
}