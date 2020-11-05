// Import the API interface
import callApi from "../callApi.js";

// Import the function for parsing dates into timestamps
import parseDate from "../functions/parseDate.js";

// Import the fault-resilient function for retrieving object properties
import getSafeProperty from "../functions/getSafeProperty.js";

// Function that returns data on a single launch via a callback
export default function getSingleLaunch(route, callback, errorCallback) {
    // Retrieve the id of the launch
    const launchId = route.params.launchId;

    // Callback that parses the returned data and then enters it to the callback sent by the view
    function handleData(rawData) {
        var launchData = {
            // Data to be displayed in the page header
            header: {
                imageSrc: rawData.image,
                title: rawData.name.substring(
                    rawData.name.indexOf("|") + 2,
                    rawData.name.length
                ),
                subTitle: parseDate(rawData.window_start),
                subTitleAsCountdown: true,
                smallTitle: rawData.launch_service_provider.name,
                description: getSafeProperty("mission.description", rawData),
                buttonUrl: `/agencies/${rawData.launch_service_provider.id}`
            },

            // Data to be displayed in the details list (retrieved below)
            details: []
        };

        // List of all potential detail properties
        var detailProperties = [
            { label: "Launch provider:", name: "launch_service_provider.name" },
            { label: "Rocket:", name: "rocket.configuration.name" },
            { label: "Location:", name: "pad.location.name" },
            { label: "Pad:", name: "pad.name" },
            { label: "Mission type:", name: "mission.type" },
            { label: "Target", name: "mission.orbit.name" },
            { label: "Window start:", name: "window_start" },
            { label: "Window end:", name: "rawData.window_end" }
        ];

        // Loop through the potential properties
        for (var detail of detailProperties) {
            // Try to retrieve them
            var value = getSafeProperty(detail.name, rawData);

            // If they do exist, add them to the list of details
            if (value != undefined) {
                launchData.details.push({ rowData: [detail.label, value] });
            }
        }

        // Add the button text
        launchData.header.buttonText = `Learn more about ${
            // Use the abbreviation if the launch provider name is longer than 14 characters
            rawData.launch_service_provider.name.length < 15
                ? rawData.launch_service_provider.name
                : rawData.launch_service_provider.abbrev
        }`;

        // Return the data using the callback that was sent by the view
        callback(launchData);
    }

    callApi(`launch/upcoming/${launchId}`, handleData, errorCallback);
}
