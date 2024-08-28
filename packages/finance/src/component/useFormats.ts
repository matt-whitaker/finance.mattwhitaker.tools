
export default function useFormats() {
    return {
        dollar(value: number) {
            if (value) {
                const prefix = value >= 0 ? "$" : "-$";
                return `${prefix}${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`
            }
            return "--";
        },
        quantity(value: number) {
            return value?.toFixed(2) ?? "--";
        },
        percent(value: number) {
            return `${value.toFixed(2)}%`;
        }
    }
}