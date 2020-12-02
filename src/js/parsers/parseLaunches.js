// Import the function for parsing dates into timestamps
import parseDate from "../functions/parseDate.js";

// Function for parsing raw data for launches
export default function parseLaunches(rawData) {
    // Loop through the raw launches
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

    // Return the parsed data
    return upcomingLaunches;
}
