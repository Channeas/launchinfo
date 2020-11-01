// Function that returns a list of rockets
export default function getRockets(route) {
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
