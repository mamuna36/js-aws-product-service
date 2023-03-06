'use strict'
const AWS = require('aws-sdk')

module.exports.getProductById = async (event) => {
  const { productId } = event.pathParameters
  const documentClient = new AWS.DynamoDB.DocumentClient()
  const searchParams = {
    TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
    Key: {
      id: productId
    }
  }
  const data = await documentClient.get(searchParams).promise()
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(data)
  }
}
