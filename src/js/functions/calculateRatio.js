// Function for calculating a ratio with the right amount of decimals
export default function calculateRatio(val1, val2) {
    if (val2 == 0) {
        return "Unknown";
    }
    return `${(100 * (val1 / val2)).toFixed(2)} %`;
}
