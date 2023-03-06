'use strict'
const AWS = require('aws-sdk')

module.exports.createStock = async (event) => {
  const { id, count } = JSON.parse(event.body)
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const putParams = {
    TableName: process.env.DYNAMODB_STOCKS_TABLE,
    Item: {
      id: id,
      count: count
    }
  }
  console.log(`Stock: ${JSON.stringify(putParams)}`)
  await dynamoDb.put(putParams).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(putParams)
  }
}
