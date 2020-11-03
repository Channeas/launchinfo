// Import the API interface
import callApi from "../callApi.js";

// // Import the function for parsing dates into timestamps
// import parseDate from "../parseDate.js";

// Import the fault-resilient function for retrieving object properties
import getSafeProperty from "../getSafeProperty.js";

// Function that returns the data of a single rocket
export default function getSingleRocket(route, callback) {
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
            details: details
        });
    }

    // Call the API for the main rocket data
    callApi(`config/launcher/${rocketId}`, handleMainData);

    // return {
    //     // Header data
    //     header: {
    //         imageSrc:
    //             "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
    //         title: "Falcon 9 Block 5",
    //         subTitle: "SpaceX",
    //         description:
    //             "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit. The Block 5 variant is the fifth major interval aimed at improving upon the ability for rapid reusability.",
    //         buttonUrl: "/agency/123",
    //         buttonText: "Learn more about SpaceX"
    //     },

    //     // Rocket details
    //     details: [
    //         { rowData: ["Launch success ratio:", "100%"] },
    //         { rowData: ["Total launch count:", "38"] },
    //         { rowData: ["Country:", "USA"] },
    //         { rowData: ["Maiden flight:", "2018-05-11"] },
    //         { rowData: ["Pending launches", "34"] },
    //         { rowData: ["Length:", "70.0m"] },
    //         { rowData: ["Diameter", "3.65m"] },
    //         { rowData: ["LEO capacity", "22800 kg"] },
    //         { rowData: ["GTO capacity", "8300 kg"] },
    //         { rowData: ["Thrust", "7607 kN"] }
    //     ],

    //     // Upcoming launches
    //     upcomingLaunches: {
    //         listHead: ["Mission name", "When", "Where", ""],
    //         listData: [
    //             {
    //                 rowData: [
    //                     "GPS III SV04",
    //                     "T- 7D 12H 13M",
    //                     "Kennedy Space Center, FL, USA"
    //                 ],
    //                 rowLink: "/launches/123"
    //             },
    //             {
    //                 rowData: [
    //                     "GPS III SV04",
    //                     "T- 7D 12H 13M",
    //                     "Kennedy Space Center, FL, USA"
    //                 ],
    //                 rowLink: "/launches/124"
    //             },
    //             {
    //                 rowData: [
    //                     "GPS III SV04",
    //                     "T- 7D 12H 13M",
    //                     "Kennedy Space Center, FL, USA"
    //                 ],
    //                 rowLink: "/launches/125"
    //             },
    //             {
    //                 rowData: [
    //                     "GPS III SV04",
    //                     "T- 7D 12H 13M",
    //                     "Kennedy Space Center, FL, USA"
    //                 ],
    //                 rowLink: "/launches/126"
    //             }
    //         ],
    //         buttonText: "Learn more"
    //     }
    // };
}

// Function that parses general informations for the header
function parseHeader(rocket) {
    // Attributes used in mulitple locations
    const manufacturerName = getSafeProperty("manufacturer.name", rocket);

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
        subTitle: manufacturerName,
        description: rocket.description,
        buttonUrl: `/agency/${getSafeProperty("manufacturer.id", rocket)}`,
        buttonText: buttonText
    };

    return header;
}

// Function that parses rocket details into the correct format
function parseDetails(rocket) {
    // Calculate the launch success rate
    const totalLaunches = rocket.total_launch_count;
    var successRatio;
    if (totalLaunches != 0) {
        successRatio = `${(rocket.successful_launches / totalLaunches) *
            100} %`;
    } else {
        successRatio = "Unknown";
    }

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

// Function that remove undefined details
function filterDetails(details) {
    // Filter the details to make sure they all contain data
    for (var index = 0; index < details.length; index++) {
        const value = details[index].rowData[1];

        // Make sure that the data is neither null nor undefined
        if (
            value == null ||
            value.toString().indexOf("null") == 0 ||
            value.toString().indexOf("undefined") == 0
        ) {
            // If it is, remove this row
            details.splice(index, 1);
            index--;
        }
    }
}
