// Function that returns the data of a single agency
export default function getSingleAgency(route) {
    console.log(route);

    return {
        // Header data
        header: {
            imageSrc:
                "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
            title: "SpaceX",
            description:
                "Space Exploration Technologies Corp., known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California. It was founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars. SpaceX has many pads, on the East Coast of the US they own SLC-40 at Cape Canaveral and LC-39A at the Kennedy Space Center for their lower inclination launches. They also own SLC-4E at Vandenberg, California for their high inclination launches. Another site is also being developed at Boca Chica, Texas."
        },

        // Rocket details
        details: [
            { rowData: ["Country:", "USA"] },
            { rowData: ["Founding year:", "2002"] },
            { rowData: ["Administrator:", "CEO: Elon Musk"] },
            { rowData: ["Organization type:", "Commercial"] },
            { rowData: ["Total launch count:", "106"] },
            { rowData: ["Launch success ratio:", "94.3%"] },
            { rowData: ["Attempted booster landings:", "80"] },
            { rowData: ["Booster landing success ratio:", "83.7%"] }
        ],

        // Upcoming launches
        upcomingLaunches: {
            listHead: ["Mission name", "Rocket", "When", "Where", ""],
            listData: [
                {
                    rowData: [
                        "GPS III SV04",
                        "Falcon 9",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/123"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "Falcon 9",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/124"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "Falcon 9",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/125"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "Falcon 9",
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
