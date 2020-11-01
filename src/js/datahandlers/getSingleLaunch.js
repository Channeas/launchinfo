// Import the API interface
import callApi from "../callApi.js";

// Import the function for parsing dates into timestamps
import parseDate from "../parseDate.js";

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
                description: rawData.mission.description,
                buttonUrl: `/agency/${rawData.launch_service_provider.id}`
            },

            // Data to be displayed in the details list
            details: [
                {
                    rowData: [
                        "Launch provider:",
                        rawData.launch_service_provider.name
                    ]
                },
                { rowData: ["Rocket:", rawData.rocket.configuration.name] },
                { rowData: ["Location:", rawData.pad.location.name] },
                { rowData: ["Pad:", rawData.pad.name] },
                { rowData: ["Mission type:", rawData.mission.type] },
                { rowData: ["Target", rawData.mission.orbit.name] },
                { rowData: ["Window start:", rawData.window_start] },
                { rowData: ["Window end:", rawData.window_end] }
            ]
        };

        // Add the button text
        if (rawData.launch_service_provider.name.length < 15) {
            launchData.header.buttonText = `Learn more about ${rawData.launch_service_provider.name}`;
        } else {
            launchData.header.buttonText = `Learn more about ${rawData.launch_service_provider.abbrev}`;
        }

        // Return the data using the callback that was sent by the view
        callback(launchData);
    }

    callApi(`launch/upcoming/${launchId}`, handleData, errorCallback);
}
