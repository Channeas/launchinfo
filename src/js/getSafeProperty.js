// A recursive function that prevents errors when getting (sub)properties that might not exist
export default function getSafeProperty(path, parent) {
    const property = path.shift();

    if (parent[property]) {
        if (path.length == 0) {
            return parent[property];
        } else {
            return getProperty(path, parent[property]);
        }
    } else {
        return undefined;
    }
}
