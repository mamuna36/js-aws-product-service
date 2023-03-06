'use strict'
const AWS = require('aws-sdk')

module.exports.getProductById = async (event) => {
  const { productId } = event.pathParameters
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const searchParams = {
    TableName: process.env.DYNAMODB_STOCKS_TABLE,
    Item: {
      Key: { id: productId }
    }
  }
  const data = dynamoDb.query(searchParams)

  if (data) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(data)
    }
  } else {
    return {
      statusCode: 409,
      body: JSON.stringify({
        message: `Stock with id '${productId}' not found`
      })
    }
  }
}
