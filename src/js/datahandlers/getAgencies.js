// Import the API interface
import callApi from "../callApi.js";

// Function that returns a list of upcoming launches via a callback
export default function getAgencies(route, callback) {
    // Second callback, that parses the returned data and then enters it to the view's callback
    function handleData(rawData) {
        // Loop through the returned agencies
        const agencies = [];
        for (const agency of rawData.results) {
            // Parse the data to fit the components on the Agencies view
            const res = {
                imageSrc: agency.logo_url,
                title: `${agency.abbrev} - ${agency.name}`,
                subTitle: agency.type,
                id: agency.id,
                description: `Founded in ${agency.founding_year}`
            };

            // Push the parsed launch into the list of launches
            agencies.push(res);
        }

        // Return the data using the callback that was sent by the view
        callback(agencies);
    }

    // Take into account what page the user is on
    var offset = 0;
    if (route.query.page) {
        offset = (route.query.page - 1) * 15;
    }

    // Get the data on upcoming launches from the API
    callApi(
        `agencies/?limit=15&offset=${offset}&mode=detailed&featured=true`,
        handleData
    );
}
