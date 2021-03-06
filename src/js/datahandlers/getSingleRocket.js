// Import the API interface
import callApi from "../callApi.js";

// // Import the function for parsing dates into timestamps
import parseDate from "../functions/parseDate.js";

// Import the fault-resilient function for retrieving object properties
import getSafeProperty from "../functions/getSafeProperty.js";

// Import the function for filtering away empty details
import filterDetails from "../functions/filterDetails.js";
import calculateRatio from "../functions/calculateRatio.js";

// Function that returns the data of a single rocket
export default function getSingleRocket(route, callback, errorCallback) {
    // Retrieve the id of the rocket
    const rocketId = route.params.rocketId;

    // Function that handles the main data response
    function handleMainData(rocket) {
        // Retrieve the details
        const details = parseDetails(rocket);

        // Filter the details to make sure they all contain data
        filterDetails(details);

        // Return the retrieved data
        callback({
            header: parseHeader(rocket),
            details: details,
            pageTitle: rocket.full_name
        });
    }

    // Call the API for the main rocket data
    callApi(`config/launcher/${rocketId}`, handleMainData, errorCallback);

    // Function that handles upcoming launch data
    function handleLaunches(launches) {
        const upcomingLaunches = {
            listHead: ["Mission name", "When", "Where", ""],
            listData: [],
            buttonText: "Learn more"
        };

        for (const launch of launches.results) {
            // Determine the launch location
            var location = getSafeProperty("pad.location.name", launch);
            if (!location) {
                location = "Unknown location";
            }

            upcomingLaunches.listData.push({
                rowData: [
                    launch.name.substring(
                        launch.name.indexOf("|") + 2,
                        launch.name.length
                    ),
                    parseDate(launch.window_start),
                    location
                ],
                rowLink: `/launches/${launch.id}`
            });
        }

        callback({
            upcomingLaunches: upcomingLaunches
        });
    }

    // Call the API for upcoming launches
    callApi(
        `launch/upcoming/?rocket__configuration__id=${rocketId}`,
        handleLaunches
    );
}

// Function that parses general information for the header
function parseHeader(rocket) {
    // Attributes used in mulitple locations
    const manufacturerName = getSafeProperty("manufacturer.name", rocket),
        manufacturerAbbrev = getSafeProperty("manufacturer.abbrev", rocket);

    // Create the button text depending on the length of the manufacturer's name
    const buttonText = `Learn more about ${
        // Use the abbreviation if the manufacturer name is longer than 14 characters
        manufacturerName.length < 15
            ? manufacturerName
            : getSafeProperty("manufacturer.abbrev", rocket)
    }`;

    // Parse other header data
    const header = {
        imageSrc: rocket.image_url,
        title: rocket.full_name,
        subTitle: `${manufacturerName} (${manufacturerAbbrev})`,
        description: rocket.description,
        buttonUrl: `/agencies/${getSafeProperty("manufacturer.id", rocket)}`,
        buttonText: buttonText
    };

    return header;
}

// Function that parses rocket details into the correct format
function parseDetails(rocket) {
    // Calculate the launch success rate
    const totalLaunches = rocket.total_launch_count;
    const successRatio = calculateRatio(
        rocket.successful_launches,
        totalLaunches
    );

    // Parse other details
    const details = [
        { rowData: ["Launch success ratio:", successRatio] },
        { rowData: ["Total launch count:", totalLaunches] },
        {
            rowData: [
                "Country:",
                getSafeProperty("manufacturer.country_code", rocket)
            ]
        },
        { rowData: ["Maiden flight:", rocket.maiden_flight] },
        { rowData: ["Pending launches", rocket.pending_launches] },
        { rowData: ["Length:", `${rocket.length}m`] },
        { rowData: ["Diameter", `${rocket.diameter}m`] },
        { rowData: ["Mass", `${rocket.launch_mass * 1000} kg`] },
        { rowData: ["LEO capacity", `${rocket.leo_capacity} kg`] },
        { rowData: ["GTO capacity", `${rocket.geo_capacity} kg`] },
        { rowData: ["Thrust", `${rocket.to_thrust} kN`] }
    ];

    return details;
}
