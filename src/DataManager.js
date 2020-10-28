/* Class used by the views to get data from the API */
export default class DataManager {
    constructor() {
        console.log("Hello, World");
    }
    getData(route) {
        console.log(route);
        // Determine where the call for data comes from and call the appropriate function
        switch (route.name) {
            case "Launches":
                return this._getLaunches(route);
            case "Launch":
                return this._getSingleLaunch(route);
            case "Rockets":
                return this._getRockets(route);
            case "Rocket":
                return this._getSingleRocket(route);
            case "Agencies":
                return this._getAgencies(route);
            case "Agency":
                return this._getSingleAgency(route);
        }
    }

    // Function that returns a list of upcoming launches
    _getLaunches(route) {
        console.log(route);

        // Call the API (this is just placeholder data)
        return [
            {
                imageSrc:
                    "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                imageTitle: "CAPE CANAVERAL, FLORIDA, USA",
                title: "Starlink 12",
                subTitle: "T- 00D 09H 55M",
                description: "SpaceX | Falcon 9 Block 5",
                id: 123
            },
            {
                imageSrc:
                    "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                imageTitle: "CAPE CANAVERAL, FLORIDA, USA",
                title: "Starlink 13",
                subTitle: "T- 00D 09H 55M",
                description: "SpaceX | Falcon 9 Block 5",
                id: 124
            },
            {
                imageSrc:
                    "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                imageTitle: "CAPE CANAVERAL, FLORIDA, USA",
                title: "Starlink 14",
                subTitle: "T- 00D 09H 55M",
                description: "SpaceX | Falcon 9 Block 5",
                id: 125
            }
        ];
    }

    // Function that returns data on a single launch
    _getSingleLaunch(route) {
        console.log(route.params);
        return {
            /* Header data */
            header: {
                imageSrc:
                    "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                title: "Starlink 12",
                subTitle: "T- 00D 09H 55M",
                smallTitle: "SpaceX",
                description:
                    "A batch of 60 satellites for Starlink mega-constellation - SpaceX's project for space-based Internet communication system.",
                buttonUrl: "/agency/123",
                buttonText: "Learn more about SpaceX"
            },

            /* Launch details */
            details: [
                { rowData: ["Launch provider:", "SpaceX"] },
                { rowData: ["Rocket:", "Falcon 9 Block 5"] },
                { rowData: ["Location:", "Kennedy Space Center, FL, USA"] },
                { rowData: ["Pad:", "Launch Complex 39A"] },
                { rowData: ["Target:", "Low Earth Orbit"] },
                { rowData: ["Mission type:", "Communications"] },
                { rowData: ["Window start:", "2020-10-03T12:34:00Z"] },
                { rowData: ["Window end:", "2020-10-03T12:34:00Z"] }
            ]
        };
    }

    // Function that returns a list of rockets
    _getRockets(route) {
        console.log(route);

        return {
            urlPrefix: "/rockets/",
            items: [
                {
                    imageSrc:
                        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                    imageTitle: "SPACEX",
                    title: "Falcon 9 Block 5",
                    subTitle: "Reusable",
                    id: 123
                },
                {
                    imageSrc:
                        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                    imageTitle: "SPACEX",
                    title: "Falcon 9 Block 5",
                    subTitle: "Reusable",
                    id: 124
                },
                {
                    imageSrc:
                        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                    imageTitle: "SPACEX",
                    title: "Falcon 9 Block 5",
                    subTitle: "Reusable",
                    id: 125
                }
            ]
        };
    }

    // Function that returns the data of a single rocket
    _getSingleRocket(route) {
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

    // Function that returns a list of agencies
    _getAgencies(route) {
        console.log(route);

        return {
            urlPrefix: "/agencies/",
            items: [
                {
                    imageSrc:
                        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/logo/arianespace_logo_20190207032425.png",
                    title: "Arianespace",
                    subTitle: "Commercial",
                    description: "Founded in 1980",
                    id: 123
                },
                {
                    imageSrc:
                        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/logo/blue2520origin_logo_20190207032427.png",
                    title: "Blue Origin",
                    subTitle: "Commercial",
                    description: "Founded in 2000",
                    id: 124
                },
                {
                    imageSrc:
                        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/logo/china2520aerospace2520science2520and2520technology2520corporation_logo_20200114024619.png",
                    title: "China Aerospace Science and Technology Corporation",
                    subTitle: "Reusable",
                    description: "Founded in 1999",
                    id: 125
                }
            ]
        };
    }

    // Function that returns the data of a single agency
    _getSingleAgency(route) {
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
}
