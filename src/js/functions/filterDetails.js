// Function that removes undefined details
export default function filterDetails(details) {
    // Filter the details to make sure they all contain data
    for (var index = 0; index < details.length; index++) {
        const value = details[index].rowData[1];

        // Make sure that the data is neither null nor undefined
        if (
            value == null ||
            value.toString().indexOf("null") == 0 ||
            value.toString().indexOf("undefined") == 0
        ) {
            // If it is, remove this row
            details.splice(index, 1);
            index--;
        }
    }
}
