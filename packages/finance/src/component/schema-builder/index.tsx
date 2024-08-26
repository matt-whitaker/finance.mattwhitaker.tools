import classNames from "classnames";
import InputPercent from "../input-percent";
import Schema from "../../model/schema.ts";
import GridLayout from "../grid-layout";
import GridPartitionRow from "../grid-partition-row";
import GridPositionRow from "../grid-position-row";
import useFormats from "../useFormats.ts";
import {Fragment} from "react";
import GridTitleRow from "../grid-title-row";

export type SchemaBuilderProps = { schema: Schema,  };
export default function SchemaBuilder({ schema }: SchemaBuilderProps) {
    const { percent } = useFormats();
    return (
        <GridLayout className="w-[340px]">
            <GridTitleRow>&nbsp;</GridTitleRow>
            {schema.partitions.map((partition) => (
                <Fragment key={partition.name}>
                    <GridPartitionRow className="grid-cols-7">
                        <InputPercent className="col-start-1 col-span-2" weight={partition.weight} change={() => {}} />
                        <div className="col-start-3 col-span-4">{partition.name}</div>
                    </GridPartitionRow>
                    {partition.positions.map((position, j) => (
                        <GridPositionRow key={`${position.symb}`} className={classNames("grid-cols-7", [(j % 2) ? "bg-primary bg-opacity-15" : "bg-primary bg-opacity-5"])}>
                            <div className="col-start-1 col-span-2"></div>
                            <InputPercent className="col-start-3 col-span-2" weight={position.weight} change={() => {}} />
                            <div className="col-start-5 col-span-1">{`${position.symb}`}</div>
                            <div className="col-start-6 col-span-2">{percent(partition.weight * position.weight / 100)}</div>
                        </GridPositionRow>
                    ))}
                </Fragment>
            ))}
        </GridLayout>
    )
}