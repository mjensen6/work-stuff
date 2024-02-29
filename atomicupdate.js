const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const updateCounters = async (reportId) => {
    const params = {
        TableName: 'YourTableName',
        Key: { 'ReportId': reportId },
        UpdateExpression: 'SET successCount = if_not_exists(successCount, :start) + :inc, failureCount = if_not_exists(failureCount, :start) - :dec',
        ExpressionAttributeValues: {
            ':inc': 1,
            ':dec': 1,
            ':start': 0
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        const result = await dynamoDB.update(params).promise();
        console.log('Counters updated successfully:', result);
    } catch (error) {
        console.error('Error updating counters:', error);
    }
};

// Usage
updateCounters('your-report-id');