// Function for calculating a ratio with the right amount of decimals
export default function calculateRatio(val1, val2) {
    return `${(100 * (val1 / val2)).toFixed(2)} %`;
}
