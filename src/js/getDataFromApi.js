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
    console.log(route);
    // Determine where the call for data comes from and call the appropriate function
    switch (route.name) {
        case "Launches":
            return getLaunches(route, callback);
        case "Launch":
            return getSingleLaunch(route, callback, errorCallback);
        case "Rockets":
            return getRockets(route);
        case "Rocket":
            return getSingleRocket(route);
        case "Agencies":
            return getAgencies(route, callback);
        case "Agency":
            return getSingleAgency(route);
    }
}
