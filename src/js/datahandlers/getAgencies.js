// Function that returns a list of agencies
export default function getAgencies(route) {
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
