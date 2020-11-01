/* Class used by the views to get data from the API */
export default class DataManager {
    constructor() {
        console.log("Hello, World");
        this.upcomingLaunches = [];
    }

    getStuff() {
        return this.upcomingLaunches;
    }

    getData(route, callback, errorCallback) {
        console.log(route);
        // Determine where the call for data comes from and call the appropriate function
        switch (route.name) {
            case "Launches":
                return this._getLaunches(route, callback);
            case "Launch":
                return this._getSingleLaunch(route, callback, errorCallback);
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
    _getLaunches(route, callback) {
        console.log(route);

        // Second callback, that parses the returned data and then enters it to the view's callback
        function handleData(rawData) {
            // Loop through the returned launches
            var upcomingLaunches = [];
            for (var launch of rawData.results) {
                // Parse  the data to fit the components on the Launches view
                var res = {
                    imageSrc: launch.image,
                    imageTitle: launch.pad.location.name,
                    title: launch.name.substring(
                        launch.name.indexOf("|") + 2,
                        launch.name.length
                    ),
                    subTitle: parseDate(launch.window_start),
                    description: `${launch.launch_service_provider.name} | ${launch.rocket.configuration.full_name}`,
                    id: launch.id
                };

                upcomingLaunches.push(res);
            }

            // Return the data using the callback that was sent by the view
            callback(upcomingLaunches);
        }

        // Get the data on upcoming launches from the API
        callApi("launch/upcoming/?limit=15", handleData);
    }

    // Function that returns data on a single launch
    _getSingleLaunch(route, callback, errorCallback) {
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

// Function for parsing a date as a string into a timestamp
// Note: The format of the date should be year-month-dayThour:minute:secondZ
function parseDate(dateString) {
    // Get the date
    var dateSplit = dateString.substring(0, dateString.indexOf("T")).split("-");
    var year = dateSplit[0],
        month = dateSplit[1] - 1,
        day = dateSplit[2];

    // Get the time
    var timeSplit = dateString
        .substring(dateString.indexOf("T") + 1, dateString.length - 1)
        .split(":");
    var hour = timeSplit[0],
        minute = timeSplit[1],
        second = timeSplit[2];

    return new Date(year, month, day, hour, minute, second).getTime();
}

// Function for calling the API
function callApi(path, callback, errorCallback) {
    // Query the API using the requested path
    fetch(`https://ll.thespacedevs.com/2.0.0/${path}`)
        .then(response => {
            // Check if the response was successful
            if (response.status == 200) {
                // If it was, parse the data to JSON
                const data = response.json();
                return data;
            } else {
                // If the response failed, call the error callback sent by the view
                if (errorCallback) {
                    errorCallback();
                }
                return null;
            }
        })
        .then(data => {
            // Call the callback if the response was successful
            if (data != null) {
                callback(data);
            }
        })
        .catch(error => {
            console.log("Error retrieving data from the API:", error);
        });
}
