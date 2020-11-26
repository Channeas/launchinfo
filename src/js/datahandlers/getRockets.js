// Import the API reference
import callApi from "../callApi.js";

// Function that returns a list of rockets
export default function getRockets(route, callback) {
    const itemsPerPage = 12;

    // Callback used for parsing data
    function handleData(rawData) {
        // Make sure the page is within range
        if (rawData.results.length == 0 && route.query.page != 1) {
            // If not, calculate the max page
            const maxPage = Math.ceil(rawData.count / itemsPerPage);

            // Then redirect the user to the max page
            window.location.href = `?page=${maxPage}`;
        }

        // Parse the page data
        const pageData = {
            itemCount: rawData.count,
            itemsPerPage: itemsPerPage
        };

        // Loop through the returned rockets
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

        // Return the data using the callback that was sent by the view
        callback({ items: rockets, pageData: pageData });
    }

    // Make sure that the user is on at least page 1
    if (route.query.page < 1) {
        // If not, send the user to the first page
        window.location.href = "?page=1";
        return;
    }

    // Take into account what page the user is on
    var offset = 0;
    if (route.query.page) {
        offset = (route.query.page - 1) * itemsPerPage;
    }

    // Get the data on rockets from the API
    callApi(
        `config/launcher/?limit=12&offset=${offset}&active=true`,
        handleData
    );
}
