'use strict'
const AWS = require('aws-sdk')

module.exports.getProducts = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_PRODUCTS_TABLE
  }

  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const result = await dynamodb.scan(scanParams).promise()

  if (result.Count === 0) {
    return {
      statusCode: 404,
      body: 'There are no products found'
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      total: result.Count,
      items: await result.Items.map((product) => {
        return {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price
        }
      })
    })
  }
}
