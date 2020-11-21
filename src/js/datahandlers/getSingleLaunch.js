// Import the API interface
import callApi from "../callApi.js";

// Import the function for parsing dates into timestamps
import parseDate from "../functions/parseDate.js";

// Import the fault-resilient function for retrieving object properties
import getSafeProperty from "../functions/getSafeProperty.js";

// Import the function for filtering away empty details
import filterDetails from "../functions/filterDetails.js";

// Function that returns data on a single launch via a callback
export default function getSingleLaunch(route, callback, errorCallback) {
    // Retrieve the id of the launch
    const launchId = route.params.launchId;

    // Callback that parses the returned data and then enters it to the callback sent by the view
    function handleData(launch) {
        // Create the header button text
        const providerName = getSafeProperty(
            "launch_service_provider.name",
            launch
        );
        const buttonText = `Learn more about ${
            // Use the abbreviation if the launch provider name is longer than 14 characters
            providerName.length < 15
                ? providerName
                : getSafeProperty("launch_service_provider.abbrev", launch)
        }`;

        // Create the secondary header button text
        const secondaryButtonText = `Learn more about ${getSafeProperty(
            "rocket.configuration.name",
            launch
        )}`;

        // Parse the details
        const details = parseDetails(launch);

        // Filter the details
        filterDetails(details);

        const launchData = {
            // Data to be displayed in the page header
            header: {
                imageSrc: launch.image,
                title: launch.name.substring(
                    launch.name.indexOf("|") + 2,
                    launch.name.length
                ),
                subTitle: parseDate(launch.window_start),
                subTitleAsCountdown: true,
                smallTitle: providerName,
                description: getSafeProperty("mission.description", launch),

                // Primary button leading to the agency
                buttonUrl: `/agencies/${getSafeProperty(
                    "launch_service_provider.id",
                    launch
                )}`,
                buttonText: buttonText,

                // Secondary button leading to the rocket
                secondaryButtonUrl: `/rockets/${getSafeProperty(
                    "rocket.configuration.id",
                    launch
                )}`,
                secondaryButtonText: secondaryButtonText
            },

            // Data to be displayed in the details list (retrieved below)
            details: details,
            pageTitle: launch.name.substring(
                launch.name.indexOf("|") + 2,
                launch.name.length
            )
        };

        // Return the data using the callback that was sent by the view
        callback(launchData);
    }

    callApi(`launch/upcoming/${launchId}`, handleData, errorCallback);
}

// Function that parses rocket details into the correct format
function parseDetails(launch) {
    const details = [
        {
            rowData: [
                "Launch provider:",
                getSafeProperty("launch_service_provider.name", launch)
            ]
        },
        {
            rowData: [
                "Rocket:",
                getSafeProperty("rocket.configuration.name", launch)
            ]
        },
        {
            rowData: ["Location:", getSafeProperty("pad.location.name", launch)]
        },
        { rowData: ["Pad:", getSafeProperty("pad.name", launch)] },
        { rowData: ["Mission type:", getSafeProperty("mission.type", launch)] },
        { rowData: ["Target", getSafeProperty("mission.orbit.name", launch)] },
        { rowData: ["Window start:", getSafeProperty("window_start", launch)] },
        {
            rowData: [
                "Window end:",
                getSafeProperty("launch.window_end", launch)
            ]
        }
    ];

    return details;
}
