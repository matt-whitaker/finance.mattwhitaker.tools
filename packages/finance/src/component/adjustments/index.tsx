import Schema from "../../model/schema.ts";
import Position from "../../model/position.ts";
import GridTitleRow from "../grid-title-row";
import {Fragment} from "react";
import GridPartitionRow from "../grid-partition-row";
import GridPositionRow from "../grid-position-row";
import classNames from "classnames";
import GridLayout from "../grid-layout";
import useFormats from "../useFormats.ts";

export type AdjustmentsProps = { schema: Schema; positions: Map<string, Position>; totalValue: number }
export default function Adjustments({ schema, positions, totalValue }) {
    const { dollar } = useFormats();

    return (
        <GridLayout className="w-[120px]">
            <GridTitleRow className="text-right">
                <div className="col-start-1 col-span-1 pr-1">&nbsp;</div>
            </GridTitleRow>
            {schema.partitions.map((partition) => {
                const partitionActualTotal = partition.positions.reduce((m, pos) => m + (positions.get(pos.symb)?.marketValue ?? 0), 0);
                const partitionTargetTotal = (partition.weight / 100) * totalValue;
                const partitionAdjustment = partitionTargetTotal - partitionActualTotal;
                return (
                    <Fragment key={partition.name}>
                        <GridPartitionRow className="text-right grid-cols-1">
                            <div className="col-start-1 col-span-1 pr-1">{dollar(partitionAdjustment)}</div>
                        </GridPartitionRow>
                        {partition.positions.map((position, j) => {
                            const positionActualValue = positions.get(position.symb)?.marketValue;
                            const positionTargetValue = (partition.weight / 100) * (position.weight / 100) * totalValue;
                            const positionAdjustment = positionTargetValue - positionActualValue;
                            return (
                                <GridPositionRow key={position.symb} className={classNames("text-right grid-cols-1", [(j % 2) ? "bg-primary bg-opacity-15" : "bg-primary bg-opacity-5"])}>
                                    <div className="col-start-1 col-span-1 pr-1">{dollar(positionAdjustment)}</div>
                                </GridPositionRow>
                            )
                        })}
                    </Fragment>
                )
            })}
        </GridLayout>
    )
}