'use strict'
const AWS = require('aws-sdk')

module.exports.createProduct = async (event) => {
  const { id, title, description, price } = JSON.parse(event.body)
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const putParams = {
    TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
    Item: {
      id: id,
      title: title,
      description: description,
      price: price
    }
  }
  console.log(`Product: ${JSON.stringify(putParams)}`)
  await dynamoDb.put(putParams).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(putParams)
  }
}
