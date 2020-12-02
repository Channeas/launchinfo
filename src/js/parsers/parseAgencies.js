// Function for parsing raw data for agencies
export default function parseAgencies(rawData) {
    // Loop through the raw agencies
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

    // Return the parsed data
    return agencies;
}
