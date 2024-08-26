
export default interface Schema {
    partitions: {
        name: string;
        weight: number;
        positions: {
            symb: string;
            weight: number;
            expRatio?: number;
            category?: string;
        }[];
    }[]
}