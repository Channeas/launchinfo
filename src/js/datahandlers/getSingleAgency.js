// Import the API interface
import callApi from "../callApi.js";

// Import the function for filtering away empty details
import filterDetails from "../functions/filterDetails.js";

// Function that returns the data of a single agency
export default function getSingleAgency(route, callback, errorCallback) {
    const agencyId = route.params.agencyId;

    // Function that handles the main data response
    function handleMainData(agency) {
        // Retrieve and parse the details
        const details = parseDetails(agency);

        // Filter the details to make sure they all contain data
        filterDetails(details);

        // Return the retrieved data
        callback({
            header: parseHeader(agency),
            details: details
        });
    }

    // Call the API for the main agency data
    callApi(`agencies/${agencyId}`, handleMainData, errorCallback);
}

// Function that parses general informations for the header
function parseHeader(agency) {
    console.log(agency);
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
    const launchSuccessRatio = `${(agency.successful_launches / totalLaunches) *
        100} %`;

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
        const landingSuccessRatio = `${(agency.successful_landings /
            landingCount) *
            100} %`;
        details.push({
            rowData: ["Booster landing success ratio:", landingSuccessRatio]
        });
    }

    return details;
}
