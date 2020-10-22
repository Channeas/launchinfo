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
                imageSource:
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
}
