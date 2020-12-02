// Import the functions that handle data
import getSingleLaunch from "./datahandlers/getSingleLaunch.js";
import getSingleRocket from "./datahandlers/getSingleRocket.js";
import getSingleAgency from "./datahandlers/getSingleAgency.js";
import getListData from "./getListData.js";

/* Function used by the views to get data from the API. 
   It calls the appropriate subfunction depending on the current route */
export default function getDataFromApi(route, callback, errorCallback) {
    // Load the list data for the views below
    if (
        route.name == "Agencies" ||
        route.name == "Launches" ||
        route.name == "Launches landing" ||
        route.name == "Rockets"
    ) {
        return getListData(route, callback, errorCallback);
    }

    // Determine where the call for data comes from and call the appropriate function
    switch (route.name) {
        case "Launch":
            return getSingleLaunch(route, callback, errorCallback);
        case "Rocket":
            return getSingleRocket(route, callback, errorCallback);
        case "Agency":
            return getSingleAgency(route, callback, errorCallback);
    }
}
