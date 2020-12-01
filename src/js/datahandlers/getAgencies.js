// Import the API interface
import callApi from "../callApi.js";

// Function that returns a list of upcoming launches via a callback
export default function getAgencies(route, callback, errorCallback) {
    const itemsPerPage = 12;

    // Second callback, that parses the returned data and then enters it to the view's callback
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

        // Loop through the returned agencies
        const agencies = [];
        for (const agency of rawData.results) {
            // Parse the data to fit the components on the Agencies view
            const res = {
                imageSrc: agency.logo_url,
                title: `${agency.abbrev} - ${agency.name}`,
                subTitle: agency.type,
                id: agency.id,
                description: "Unknown founding date",
                type: "Agency"
            };

            if (agency.founding_year) {
                res.description = `Founded in ${agency.founding_year}`;
            }

            // Push the parsed launch into the list of launches
            agencies.push(res);
        }

        // Return the data using the callback that was sent by the view
        callback({ items: agencies, pageData: pageData });
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

    // Get the data on upcoming launches from the API
    callApi(
        `agencies/?limit=12&offset=${offset}&mode=detailed`, // &featured=true
        handleData,
        errorCallback
    );
}
