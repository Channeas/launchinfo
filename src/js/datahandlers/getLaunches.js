// Import the API interface
import callApi from "../callApi.js";

// Import the function for parsing dates into timestamps
import parseDate from "../functions/parseDate.js";

// Function that returns a list of upcoming launches via a callback
export default function getLaunches(route, callback) {
    // TODO: Add Pagination
    console.log(route);

    // Second callback, that parses the returned data and then enters it to the view's callback
    function handleData(rawData) {
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
                id: launch.id
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
        callback(upcomingLaunches);
    }

    // Get the data on upcoming launches from the API
    callApi("launch/upcoming/?limit=15&mode=detailed", handleData);
}
