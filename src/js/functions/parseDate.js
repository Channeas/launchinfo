// Function for parsing a date as a string into a timestamp
// Note: The format of the date should be year-month-dayThour:minute:secondZ
export default function parseDate(dateString) {
    // Get the date
    var dateSplit = dateString.substring(0, dateString.indexOf("T")).split("-");
    var year = dateSplit[0],
        month = dateSplit[1] - 1,
        day = dateSplit[2];

    // Get the time
    var timeSplit = dateString
        .substring(dateString.indexOf("T") + 1, dateString.length - 1)
        .split(":");
    var hour = timeSplit[0],
        minute = timeSplit[1],
        second = timeSplit[2];

    return Date.UTC(year, month, day, hour, minute, second);
}
