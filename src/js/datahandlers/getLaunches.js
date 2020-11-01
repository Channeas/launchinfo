// Import the API interface
import callApi from "../callApi.js";

// Import the function for parsing dates into timestamps
import parseDate from "../parseDate.js";

// Function that returns a list of upcoming launches via a callback
export default function getLaunches(route, callback) {
    // TODO: Add Pagination
    console.log(route);

    // Second callback, that parses the returned data and then enters it to the view's callback
    function handleData(rawData) {
        // Loop through the returned launches
        var upcomingLaunches = [];
        for (var launch of rawData.results) {
            // Parse  the data to fit the components on the Launches view
            var res = {
                imageSrc: launch.image,
                imageTitle: launch.pad.location.name,
                title: launch.name.substring(
                    launch.name.indexOf("|") + 2,
                    launch.name.length
                ),
                subTitle: parseDate(launch.window_start),
                description: `${launch.launch_service_provider.name} | ${launch.rocket.configuration.full_name}`,
                id: launch.id
            };

            upcomingLaunches.push(res);
        }

        // Return the data using the callback that was sent by the view
        callback(upcomingLaunches);
    }

    // Get the data on upcoming launches from the API
    callApi("launch/upcoming/?limit=15", handleData);
}
