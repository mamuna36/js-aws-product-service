'use strict'
const products = require('./data/mockProducts.json')
module.exports.getProducts = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-origin': '*'
    },
    body: JSON.stringify(products)
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

module.exports.getProductById = async (event) => {
  const { id } = event
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-origin': '*'
    },
    body: JSON.stringify(products.find((product) => product.id === id))
  }
}
