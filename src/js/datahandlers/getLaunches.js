// Import the API interface
import callApi from "../callApi.js";

// Import the function for parsing dates into timestamps
import parseDate from "../functions/parseDate.js";

// Function that returns a list of upcoming launches via a callback
export default function getLaunches(route, callback, errorCallback) {
    const itemsPerPage = 12;

    // Second callback, that parses the returned data and then enters it to the view's callback
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

        // Loop through the returned launches
        const upcomingLaunches = [];
        for (const launch of rawData.results) {
            // Parse the data to fit the components on the Launches view
            const res = {
                imageSrc: launch.image,
                imageTitle: launch.pad.location.name,
                title: launch.name.substring(
                    launch.name.indexOf("|") + 2,
                    launch.name.length
                ),
                subTitle: parseDate(launch.window_start),
                subTitleAsCountdown: true,
                id: launch.id,
                type: "Launch"
            };

            // Add the launch provider and rocket name (potentially use the abbreviation of the launch provider)
            const providerName =
                launch.launch_service_provider.name.length < 15
                    ? launch.launch_service_provider.name
                    : launch.launch_service_provider.abbrev;
            res.description = `${providerName} | ${launch.rocket.configuration.full_name}`;

            // Push the parsed launch into the list of launches
            upcomingLaunches.push(res);
        }

        // Return the data using the callback that was sent by the view
        callback({ items: upcomingLaunches, pageData: pageData });
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

    // Get the data on upcoming launches from the API
    callApi(
        `launch/upcoming/?limit=12&offset=${offset}&mode=detailed`,
        handleData,
        errorCallback
    );
}
