import Schema from "../../model/schema.ts";
import Position from "../../model/position.ts";
import GridTitleRow from "../grid-title-row";
import {Fragment} from "react";
import GridPartitionRow from "../grid-partition-row";
import GridPositionRow from "../grid-position-row";
import classNames from "classnames";
import GridLayout from "../grid-layout";
import useFormats from "../useFormats.ts";

export type AdjustmentsProps = { schema: Schema; positions: Map<string, Position>; totalValue: number; className?: string; }
export default function Adjustments({ schema, positions, totalValue, className }: AdjustmentsProps) {
    const { dollar } = useFormats();
    return (
        <GridLayout className={classNames("w-[110px]", [className])}>
            <GridTitleRow className="text-right">
                <div className="col-start-1 col-span-1 pr-1">&nbsp;</div>
            </GridTitleRow>
            {schema.partitions.map((partition) => {
                return (
                    <Fragment key={partition.name}>
                        <GridPartitionRow className="text-right grid-cols-1">
                            &nbsp;
                        </GridPartitionRow>
                        {partition.positions.map((position, j) => {
                            const positionActualValue = positions.get(position.symb)?.marketValue;
                            const positionTargetValue = (partition.weight / 100) * (position.weight / 100) * totalValue;
                            const positionAdjustment = positionTargetValue - positionActualValue;
                            const positionSharesAdjustment = positionAdjustment / positions.get(position.symb)?.price;
                            console.log(position.symb, positionSharesAdjustment);
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