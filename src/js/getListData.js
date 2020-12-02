// Import the API interface
import callApi from "./callApi.js";

// Import the individual data parsers
import parseAgencies from "./parsers/parseAgencies.js";
import parseLaunches from "./parsers/parseLaunches.js";
import parseRockets from "./parsers/parseRockets.js";

// Uniform function for retrieving data for the list views
export default function getListData(route, callback, errorCallback) {
    const itemsPerPage = 12;

    // Callback that recieves the data from the API call
    function handleData(rawData) {
        // Make sure the page is within range
        if (rawData.results.length == 0 && route.query.page != 1) {
            // If not, calculate the max page
            const maxPage = Math.ceil(rawData.count / itemsPerPage);

            // Then redirect the user to the max page
            window.location.href = `?page=${maxPage}`;
        }

        // Parse the page data
        const pageData = {
            itemCount: rawData.count,
            itemsPerPage: itemsPerPage
        };

        // Parse the data for this particular view
        var items = dataParser(rawData);

        callback({ items: items, pageData: pageData });
    }

    // Make sure that the user is on at least page 1
    if (route.query.page < 1) {
        // If not, send the user to the first page
        window.location.href = "?page=1";
        return;
    }

    // Take into account what page the user is on
    var offset = 0;
    if (route.query.page) {
        offset = (route.query.page - 1) * itemsPerPage;
    }

    // Determine the url and the data parser depending on the route
    var url, dataParser;
    switch (route.name) {
        case "Agencies":
            url = `agencies/?limit=12&offset=${offset}&mode=detailed`;
            dataParser = parseAgencies;
            break;
        case "Launches":
        case "Launches landing":
            url = `launch/upcoming/?limit=12&offset=${offset}&mode=detailed`;
            dataParser = parseLaunches;
            break;
        case "Rockets":
            url = `config/launcher/?limit=12&offset=${offset}&active=true`;
            dataParser = parseRockets;
            break;
        default:
            console.log("Error: Unknown route, API not called");
            return;
    }

    // Get the data on upcoming launches from the API
    callApi(url, handleData, errorCallback);
}
