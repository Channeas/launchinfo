// Function that handles interaction with the API
export default function callApi(path, callback, errorCallback) {
    // Query the API using the requested path
    fetch(`https://ll.thespacedevs.com/2.0.0/${path}`)
        .then(response => {
            // Check if the response was successful
            if (response.status == 200) {
                // If it was, parse the data to JSON
                const data = response.json();
                return data;
            } else {
                // If the response failed, call the error callback sent by the view
                if (errorCallback) {
                    errorCallback(response.status);
                }
                return null;
            }
        })
        .then(data => {
            // Call the callback if the response was successful
            if (data != null) {
                callback(data);
            }
        })
        .catch(error => {
            console.log("Error retrieving data from the API:", error);
            errorCallback(error.status);
        });
}
