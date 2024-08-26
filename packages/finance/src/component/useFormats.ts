
export default function useFormats() {
    return {
        dollar(value: number) {
            return value ? `$${value?.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : "--";
        },
        quantity(value: number) {
            return value?.toFixed(2) ?? "--";
        },
        percent(value: number) {
            return `${value.toFixed(2)}%`;
        }
    }
}