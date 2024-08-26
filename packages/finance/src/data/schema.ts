import Schema from "../model/schema.ts";

const schema: Schema = {
    partitions: [
        {
            name: "United States",
            weight: 62,
            positions: [
                {
                    symb: "VOO",
                    weight: 75,
                    category: "Large Cap"
                },
                {
                    symb: "IVOO",
                    weight: 15
                },
                {
                    symb: "VIOO",
                    weight: 10
                }
            ]
        },
        {
            name: "Foreign Developed",
            weight: 12,
            positions: [
                {
                    symb: "SCHF",
                    weight: 80,
                    category: "Large Cap"
                },
                {
                    symb: "SCHC",
                    weight: 20
                },
            ]
        },
        {
            name: "Emerging Markets",
            weight: 7,
            positions: [
                {
                    symb: "SCHE",
                    weight: 100,
                    category: "Large Cap"
                }
            ]
        },
        {
            name: "Select Risk",
            weight: 2,
            positions: [
                {
                    symb: "INCO",
                    weight: 100,
                }
            ]
        },
        {
            name: "Dividends",
            weight: 5,
            positions: [
                {
                    symb: "SCHD",
                    weight: 80,
                },
                {
                    symb: "SCHY",
                    weight: 20,
                }
            ]
        },
        {
            name: "Real Estate",
            weight: 2,
            positions: [
                {
                    symb: "BBRE",
                    weight: 100,
                }
            ]
        },
        {
            name: "Income",
            weight: 10,
            positions: [
                {
                    symb: "BNDX",
                    weight: 20,
                },
                {
                    symb: "SCMB",
                    weight: 20,
                },
                {
                    symb: "SGOV",
                    weight: 60,
                }
            ]
        },
    ]
}

export default schema;