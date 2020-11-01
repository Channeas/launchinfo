// A recursive function that prevents errors when getting (sub)properties that might not exist
export default function getSafeProperty(path, parent) {
    // Get the topmost property name
    const property = path.shift();

    // Check if it exists
    if (parent[property]) {
        // If there are no more properties after this, return the value of the property
        if (path.length == 0) {
            return parent[property];
        } else {
            // Else keep looking deeper
            return getSafeProperty(path, parent[property]);
        }
    } else {
        // Return undefined if the property does not exist
        return undefined;
    }
}
