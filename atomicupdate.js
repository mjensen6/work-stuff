const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const updateCounters = async (tableName, reportId) => {
  const params = {
    TransactItems: [{
      Update: {
        TableName: tableName,
        Key: { reportId: reportId },
        UpdateExpression:
          "SET successCount = successCount + :inc, failCount = failCount - :dec",
        ExpressionAttributeValues: {
          ":inc": 1,
          ":dec": 1
        },
        ReturnValues: "UPDATED_NEW"
      }
    }]
  };

  try {
    const result = await dynamodb.transactWrite(params).promise();
    console.log("Transaction Successful:", result);
    return result; // Modify this to return what you find useful
  } catch (error) {
    console.error("Transaction Failed:", error);
    throw error; // Proper error handling by re-throwing it for the caller to handle
  }
};