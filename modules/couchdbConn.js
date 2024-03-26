async function getDatabaseInfo(dbName) {
    try {
        // Dynamically import fetch
        const fetch = await import('node-fetch').then(module => module.default);

        // Set the CouchDB server URL
        const couchdbUrl = `http://localhost:5984/${dbName}`;

        // Set request headers
        const headers = {
            'Accept': 'application/json'
        };

        // Send GET request to get information about the specified database
        const response = await fetch(couchdbUrl, { headers });

        if (response.ok) {
            // Request completed successfully
            const data = await response.json();
            return data;
        } else if (response.status === 404) {
            // Requested database not found
            console.log("Requested database not found.");
            return null;
        } else {
            // Other error
            console.error("Failed to retrieve database info. Status code:", response.status);
            return null;
        }
    } catch (error) {
        // Error occurred
        console.error("Error:", error.message);
        return null;
    }
}

module.exports = getDatabaseInfo;
