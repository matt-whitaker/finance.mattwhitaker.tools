import Schema from "../../model/schema.ts";
import Position from "../../model/position.ts";
import GridLayout from "../grid-layout";
import GridPartitionRow from "../grid-partition-row";
import GridPositionRow from "../grid-position-row";
import classNames from "classnames";
import useFormats from "../useFormats.ts";
import {Fragment} from "react";
import GridTitleRow from "../grid-title-row";

export type ActualsProps = { schema: Schema; positions: Map<string, Position>; totalValue: number }
export default function Actuals({ schema, positions, totalValue }: ActualsProps) {
    const { dollar } = useFormats();

    return (
        <GridLayout className="w-[120px]">
            <GridTitleRow className="text-right">
                <div className="col-start-1 col-span-1 pr-1">{dollar(totalValue)}</div>
            </GridTitleRow>
            {schema.partitions.map((partition) => {
                const partitionTotal = partition.positions.reduce((m, pos) => m + (positions.get(pos.symb)?.marketValue ?? 0), 0);
                return (
                    <Fragment key={partition.name}>
                        <GridPartitionRow className="text-right grid-cols-1">
                            <div className="col-start-1 col-span-1 pr-1">{dollar(partitionTotal)}</div>
                        </GridPartitionRow>
                        {partition.positions.map((position, j) => (
                            <GridPositionRow key={position.symb} className={classNames("text-right grid-cols-1", [(j % 2) ? "bg-primary bg-opacity-15" : "bg-primary bg-opacity-5"])}>
                                <div className="col-start-1 col-span-1 pr-1">{dollar(positions.get(position.symb)?.marketValue)}</div>
                            </GridPositionRow>
                        ))}
                    </Fragment>
                )
            })}
        </GridLayout>
    )
}