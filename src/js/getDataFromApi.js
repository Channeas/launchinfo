// Import the functions that handle data
import getLaunches from "./datahandlers/getLaunches.js";
import getSingleLaunch from "./datahandlers/getSingleLaunch.js";
import getRockets from "./datahandlers/getRockets.js";
import getSingleRocket from "./datahandlers/getSingleRocket.js";
import getAgencies from "./datahandlers/getAgencies.js";
import getSingleAgency from "./datahandlers/getSingleAgency.js";

/* Function used by the views to get data from the API. 
   It calls the appropriate subfunction depending on the current route */
export default function getDataFromApi(route, callback, errorCallback) {
    // Determine where the call for data comes from and call the appropriate function
    switch (route.name) {
        case "Launches landing": // The landing (root /) page
            return getLaunches(route, callback);
        case "Launches":
            return getLaunches(route, callback);
        case "Launch":
            return getSingleLaunch(route, callback, errorCallback);
        case "Rockets":
            return getRockets(route, callback);
        case "Rocket":
            return getSingleRocket(route, callback, errorCallback);
        case "Agencies":
            return getAgencies(route, callback);
        case "Agency":
            return getSingleAgency(route, callback, errorCallback);
    }
}
