// Function that formats a time difference into a countdown
export default function getCountdown(eventTime, currentTime, useSeconds) {
    // Constants used in the calculations below
    const dayInMilliseconds = 86400000,
        hourInMilliseconds = 3600000,
        minuteInMilliseconds = 60000;

    // Calculate the difference between the two times in milliseconds
    var difference = eventTime - currentTime;
    var sign = "-";

    // For times that have already passed
    if (eventTime < currentTime) {
        difference = currentTime - eventTime;
        sign = "+";
    }

    // Calculate the day
    var days = Math.floor(difference / dayInMilliseconds);
    difference -= days * dayInMilliseconds;

    // Calculate the hour
    var hours = Math.floor(difference / hourInMilliseconds);
    difference -= hours * hourInMilliseconds;

    // Calculate the minute
    var minutes = Math.floor(difference / minuteInMilliseconds);
    difference -= minutes * minuteInMilliseconds;

    // Potentially calculate the second
    if (useSeconds) {
        var seconds = Math.floor(difference / 1000);
        return `T${sign} ${days}D ${hours}H ${minutes}M ${seconds}S`;
    }

    // Return the time left in countdown format
    return `T${sign} ${days}D ${hours}H ${minutes}M`;
}
