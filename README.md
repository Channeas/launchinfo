# Launch Info

Launch Info (live on [launchinfo.org](https://launchinfo.org)) is a project I built to be able to keep track of upcoming rocket launches. Growing tired of the hard-to-use, old-fashioned, and feature-lacking alternatives, I decided to build my own. Some of the features I wanted were:

-   A variety of launches, not just those from the largest and most well-known providers
-   The ability to find out more about a launch provider or rocket without having to go to Wikipedia
-   The ability to filter launches from a specific launch provider or rocket
-   T- countdowns to launches

## Architecture

The project has a simple architecture, since it relies on an external API, [Launch Library 2](https://thespacedevs.com/llapi). It is hosted on AWS using CloudFront and deployed using a custom CICD pipeline I wrote in CloudFormation. You can find the CICD pipeline [here](https://github.com/Channeas/codepipeline-git-build-s3).

## Technologies

The project is a Single Page Application built using Vue.js and the Vue Router.

## Challenges

During the development of the project I faced a few challenges. Some notable were:

-   Different response structure and content. Depending on what data was available for different launches, rockets, and agencies, the structure of the API responses could vary greatly. To avoid "cannot read property of null" errors, I wrote a recursive function for reading properties "safely" (first code highlight below)
-   Sending data between components. As the project grew with more and more components and subcomponents, I ended up using a lot of props. This both decreased productivity and introduced some unnecessary errors
-   Maintaining an intuitive file structure as the project grew. Due to a lack of planning at the start of the project, I had to restructure the codebase multiple times. Some examples are the commits [6be774a](https://github.com/Channeas/launchinfo/commit/6be774a77b38b384f675da6792eece6a65f13556), [5db0511](https://github.com/Channeas/launchinfo/commit/5db0511cc05b432eca17f89a96ce2792b562d1be#diff-44145b4646ba00cf3afdd124b880a23f47279f07dad0d139a7b26cd531123cf3), and [51015c6](https://github.com/Channeas/launchinfo/commit/51015c69588dfd26e1ca80d61ec8e3561a084f26)

## Code highlights

As with any project, there are some parts of the codebase that I'm more proud of than others. Two examples of my top code in this project follow below:

##### Function for reading properties that might not exist

```javascript
// Recursive function for reading a paramater following a certain path
function readProperty(path, parent) {
    // Get the topmost property name
    const property = path.shift();

    // Check if the property exists
    if (parent[property]) {
        // If there are no more properties after this, return the value of the property
        if (path.length == 0) {
            return parent[property];
        } else {
            // Else keep looking deeper
            return readProperty(path, parent[property]);
        }
    } else {
        // Return undefined if the property does not exist
        return undefined;
    }
}
```

##### Function for interacting with the API

```javascript
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
```

## Key takeaways

I learned a ton during this project. Some of the key takeaways I will keep in mind for future projects are:

-   Plan thoroughly, and decide on a scalable file structure early on
-   Use a centralized store/state management pattern (Vuex) to avoid endless props
-   Use unit testing to prevent bugs
