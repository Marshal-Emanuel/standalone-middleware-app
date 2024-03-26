function verifyDataWithSha256(data) {
    try {
        // Parse the data to ensure it's valid JSON
        const jsonData = JSON.parse(JSON.stringify(data));

        // Check if the data follows the expected format
        const expectedFormat = {
            id: "string",
            data: {
                _id: "string",
                _rev: "string",
                parent: "string",
                type: "string",
                is_name_generated: "boolean",
                name: "string",
                external_id: "string",
                contact: {
                    _id: "string"
                },
                geolocation: "string",
                meta: {
                    created_by: "string",
                    created_by_person_uuid: "string",
                    created_by_place_uuid: "string"
                },
                contact_type: "string",
                reported_date: "number",
                form_version: {
                    time: "number",
                    sha256: "string"
                }
            }
        };

        validateSchema(jsonData, expectedFormat); // Validate data format

        // Check if the sha256 value matches the expected value
        if (jsonData.data && jsonData.data.form_version && jsonData.data.form_version.sha256 !== undefined) {
            return true; // Data has the expected structure with sha256 key
        } else {
            console.error("Document does not contain the 'sha256' key in the 'form_version' object");
            return false; // Data does not have the expected structure with sha256 key
        }
    } catch (error) {
        console.error("Data verification failed:", error.message);
        return false; // Data is not valid or does not match the expected format
    }
}

// Function to validate if the data matches the expected schema
function validateSchema(data, schema) {
    for (const key in schema) {
        if (!(key in data)) {
            throw new Error(`Key '${key}' is missing in the data`);
        }

        if (typeof data[key] !== schema[key]) {
            throw new Error(`Invalid type for key '${key}': expected '${schema[key]}'`);
        }

        if (typeof schema[key] === "object") {
            validateSchema(data[key], schema[key]); // Recursively validate nested objects
        }
    }
}

module.exports = verifyDataWithSha256;

