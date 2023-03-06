'use strict'
const AWS = require('aws-sdk')

module.exports.getProductById = async (event) => {
  const { id } = event.pathParameters
  const documentClient = new AWS.DynamoDB.DocumentClient()
  var params = {}
  params.TableName = process.env.DYNAMODB_PRODUCTS_TABLE
  var key = { id: id }
  params.Key = key
  const data = await documentClient.get(params).promise()
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(data)
  }
}
