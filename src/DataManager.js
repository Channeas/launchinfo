/* Class used by the views to get data from the API */
export default class DataManager {
    constructor() {
        console.log("Hello, World");
    }
    getData(route) {
        // Determine where the call for data comes from and call the appropriate function
        switch (route.path) {
            case "/launches":
                return this._getLaunches(route);
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
}
