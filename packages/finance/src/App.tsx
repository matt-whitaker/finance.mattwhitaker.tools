import Shell from "./component/shell";
import SchemaBuilder from "./component/schema-builder";
import schema from "./data/schema.ts";
import Positions from "./component/positions";
import positionsService from "./service/position.ts";
import Actuals from "./component/actuals";
import Targets from "./component/targets";
import Adjustments from "./component/adjustments";

export default function App() {
    const positionsMap = positionsService._cache.index;
    const positionsSet = positionsService._cache.list;
    const totalValue = positionsService._cache.totalValue;

    return (
        <Shell>
            <div className="flex">
                <SchemaBuilder schema={schema} />
                <Adjustments schema={schema} positions={positionsMap} totalValue={totalValue} />
                <Targets schema={schema} positions={positionsMap} totalValue={totalValue} className="border-l-2 border-double border-primary" />
                <Actuals schema={schema} positions={positionsMap} totalValue={totalValue} />
                <Positions schema={schema} positions={positionsMap} totalValue={totalValue} className="border-x-2 border-double border-primary" />
            </div>
        </Shell>
    )
}