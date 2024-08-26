import account_csv from "../data/account_csv.ts";
import Position from "../model/position.ts";
import {CsvSchwab} from "../model/schwab.ts";
import {CLEAN_NUMBER_REGEX} from "../model/regex.ts";


export class PositionService {
    constructor(csvPositions: CsvSchwab[]) {
        let totalValue = 0;
        csvPositions.forEach((csvPosition) => {
            const position: Position = {
                symbol: csvPosition[CsvSchwab.SYMBOL],
                description: csvPosition[CsvSchwab.DESCRIPTION],
                quantity: Number(csvPosition[CsvSchwab.QUANTITY].replace(CLEAN_NUMBER_REGEX, "")),
                price: Number(csvPosition[CsvSchwab.PRICE].replace(CLEAN_NUMBER_REGEX, "")),
                marketValue: Number(csvPosition[CsvSchwab.MARKET_VALUE].replace(CLEAN_NUMBER_REGEX, "")),
                costBasis: Number(csvPosition[CsvSchwab.COST_BASIS].replace(CLEAN_NUMBER_REGEX, "")),
                dividendYield: Number(csvPosition[CsvSchwab.DIVIDEND_YIELD].replace(CLEAN_NUMBER_REGEX, "")),
                exDividend: csvPosition[CsvSchwab.EX_DIVIDEND]
            }

            this._cache.index.set(position.symbol, position);
            this._cache.list.add(position);
            this._cache.totalValue += position.marketValue;
        })
    }
    _cache = {
        totalValue: 0,
        index: new Map<string, Position>,
        list: new Set<Position>,
    }

    async get(symb: string) {
        return this._cache.index.get(symb);
    }

    async list() {
        return [...this._cache.list];
    }
}

export default new PositionService(account_csv as CsvSchwab[]);