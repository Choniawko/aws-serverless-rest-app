const AWS = require("aws-sdk")

const client = new AWS.DynamoDB.DocumentClient()

const BLOG_TABLE = process.env.BLOG_TABLE

module.exports.run = async event => {
    console.log(event.pathParameters, event.pathParameters.proxy, { event })
    const { proxy } = event.pathParameters
    const params = {
        TableName: BLOG_TABLE,
        Key: {
            postId: proxy
        }
    }
    try {
        const result = await client.get(params).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error
            })
        }
    }
}
