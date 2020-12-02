// Function for parsing raw data for rockets
export default function parseRockets(rawData) {
    // Loop through the raw rockets
    const rockets = [];
    for (const rocket of rawData.results) {
        // Parse the data to fit the components on the Rockets view
        rockets.push({
            imageSrc: rocket.image_url,
            imageTitle: rocket.manufacturer.name,
            title: rocket.name,
            subTitle: rocket.reusable ? "Reusable" : "Not reusable",
            id: rocket.id,
            type: "Rocket"
        });
    }

    // Return the parsed rockets
    return rockets;
}
