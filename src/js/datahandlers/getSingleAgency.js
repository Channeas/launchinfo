// Import the API interface
import callApi from "../callApi.js";

// Import the function for parsing dates into timestamps
import parseDate from "../functions/parseDate.js";

// Import the fault-resilient function for retrieving object properties
import getSafeProperty from "../functions/getSafeProperty.js";

// Import the function for filtering away empty details
import filterDetails from "../functions/filterDetails.js";

// Import the function for calculating ratios
import calculateRatio from "../functions/calculateRatio.js";

// Function that returns the data of a single agency
export default function getSingleAgency(route, callback, errorCallback) {
    const agencyId = route.params.agencyId;

    // Function that handles the main data response
    function handleMainData(agency) {
        // Start loading the upcoming launches of this agency
        getAgencyLaunches(agency, handleLaunches);

        // Retrieve and parse the details
        const details = parseDetails(agency);

        // Filter the details to make sure they all contain data
        filterDetails(details);

        // Return the retrieved data
        callback({
            header: parseHeader(agency),
            details: details,
            pageTitle: agency.name
        });
    }

    // Function that handles upcoming launch data
    function handleLaunches(launches) {
        const upcomingLaunches = {
            listHead: ["Mission name", "Rocket", "When", "Where", ""],
            listData: [],
            buttonText: "Learn more"
        };

        for (const launch of launches.results) {
            // Determine the launch location
            var location = getSafeProperty("pad.location.name", launch);
            if (!location) {
                location = "Unknown location";
            }

            // Determine the rocket type
            var rocketName = getSafeProperty(
                "rocket.configuration.full_name",
                launch
            );
            if (!rocketName) {
                rocketName = "Unknown rocket";
            }

            upcomingLaunches.listData.push({
                rowData: [
                    launch.name.substring(
                        launch.name.indexOf("|") + 2,
                        launch.name.length
                    ),
                    rocketName,
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

    // Call the API for the main agency data
    callApi(`agencies/${agencyId}`, handleMainData, errorCallback);
}

// Function that parses general information for the header
function parseHeader(agency) {
    // Parse other header data
    const header = {
        imageSrc: agency.logo_url,
        title: agency.name,
        description: agency.description
    };

    return header;
}

// Function that parses rocket details into the correct format
function parseDetails(agency) {
    // Calculate the launch success ratio
    const totalLaunches = agency.total_launch_count;
    const launchSuccessRatio = calculateRatio(
        agency.successful_launches,
        totalLaunches
    );

    // Parse other details
    const details = [
        { rowData: ["Country:", agency.country_code] },
        { rowData: ["Founding year:", agency.founding_year] },
        { rowData: ["Administrator:", agency.administrator] },
        { rowData: ["Organization type:", agency.type] },
        { rowData: ["Abbreviation:", agency.abbrev] },
        { rowData: ["Total launch count:", agency.total_launch_count] },
        { rowData: ["Launch success ratio:", launchSuccessRatio] },
        { rowData: ["Pending launches:", agency.pending_launches] }
    ];

    // Add potential booster landing data
    const landingCount = agency.attempted_landings;
    details.push({ rowData: ["Attempted booster landings:", landingCount] });

    if (landingCount > 0) {
        // Calculate the landing usccess ratio
        const landingSuccessRatio = calculateRatio(
            agency.successful_landings,
            landingCount
        );
        details.push({
            rowData: ["Booster landing success ratio:", landingSuccessRatio]
        });
    }

    return details;
}

// Function for getting the 10 most imminent launches for the agency
function getAgencyLaunches(agency, callback) {
    // Remove spaces from the agency name
    var name = agency.name;
    while (name.indexOf(" ") > -1) {
        name = name.replace(" ", "%20");
    }

    callApi(
        `launch/upcoming/?rocket__configuration__manufacturer__name=${name}`,
        callback
    );
}
