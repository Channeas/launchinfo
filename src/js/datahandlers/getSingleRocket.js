// Function that returns the data of a single rocket
export default function getSingleRocket(route) {
    console.log(route);

    return {
        // Header data
        header: {
            imageSrc:
                "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
            title: "Falcon 9 Block 5",
            subTitle: "SpaceX",
            description:
                "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit. The Block 5 variant is the fifth major interval aimed at improving upon the ability for rapid reusability.",
            buttonUrl: "/agency/123",
            buttonText: "Learn more about SpaceX"
        },

        // Rocket details
        details: [
            { rowData: ["Launch success ratio:", "100%"] },
            { rowData: ["Total launch count:", "38"] },
            { rowData: ["Country:", "USA"] },
            { rowData: ["Maiden flight:", "2018-05-11"] },
            { rowData: ["Pending launches", "34"] },
            { rowData: ["Length:", "70.0m"] },
            { rowData: ["Diameter", "3.65m"] },
            { rowData: ["LEO capacity", "22800 kg"] },
            { rowData: ["GTO capacity", "8300 kg"] },
            { rowData: ["Thrust", "7607 kN"] }
        ],

        // Upcoming launches
        upcomingLaunches: {
            listHead: ["Mission name", "When", "Where", ""],
            listData: [
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/123"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/124"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/125"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/126"
                }
            ],
            buttonText: "Learn more"
        }
    };
}
