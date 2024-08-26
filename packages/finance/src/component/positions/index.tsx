import GridLayout from "../grid-layout";
import GridPartitionRow from "../grid-partition-row";
import GridPositionRow from "../grid-position-row";
import classNames from "classnames";
import Schema from "../../model/schema.ts";
import Position from "../../model/position.ts";
import useFormats from "../useFormats.ts";
import {Fragment} from "react";
import GridTitleRow from "../grid-title-row";

export type PositionsProps = { schema: Schema; positions: Map<string, Position>; totalValue: number }
export default function Positions({ schema, positions }: PositionsProps) {
    const { dollar, quantity } = useFormats();
    return (
        <GridLayout className="w-[160px]">
            <GridTitleRow>
                <div className="col-start-1 col-span-1">&nbsp;</div>
            </GridTitleRow>
            {schema.partitions.map((partition) => (
                <Fragment key={partition.name}>
                    <GridPartitionRow>
                        <div className="col-start-1 col-span-1">&nbsp;</div>
                        <div className="col-start-2 col-span-1">&nbsp;</div>
                    </GridPartitionRow>
                    {partition.positions.map((position, j) => (
                        <GridPositionRow key={position.symb} className={classNames("text-right grid-cols-2", [(j % 2) ? "bg-primary bg-opacity-15" : "bg-primary bg-opacity-5"])}>
                            <div className="col-start-1 col-span-1 pr-1">{quantity(positions.get(position.symb)?.quantity)}</div>
                            <div className="col-start-2 col-span-1 pr-1">{dollar(positions.get(position.symb)?.price)}</div>
                        </GridPositionRow>
                    ))}
                </Fragment>
            ))}
        </GridLayout>
    )
}