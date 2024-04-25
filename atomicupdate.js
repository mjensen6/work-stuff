const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function updateCounters(tableName, reportId) {
    const params = {
        TransactItems: [{
            Update: {
                TableName: tableName,
                Key: { reportId: reportId },
                UpdateExpression: "SET successCount = successCount + :inc",
                ExpressionAttributeValues: {
                    ":inc": 1
                },
                ReturnValues: "UPDATED_NEW"
            }
        }]
    };

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            const result = await dynamodb.transactWrite(params).promise();
            console.log("Transaction Successful:", result);
            return result; // Return successful result
        } catch (error) {
            if (error.code === 'TransactionConflictException' && attempts < maxAttempts - 1) {
                await delay(50 * Math.pow(2, attempts)); // Exponential backoff
                attempts++;
            } else {
                console.error("Transaction failed after retries:", error);
                throw error; // Rethrow after last attempt
            }
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}