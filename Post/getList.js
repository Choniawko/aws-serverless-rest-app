const AWS = require("aws-sdk")

const client = new AWS.DynamoDB.DocumentClient()

const BLOG_TABLE = process.env.BLOG_TABLE

module.exports.run = async event => {
    const params = {
        TableName: BLOG_TABLE
    }
    try {
        const result = await client.scan(params).promise()
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
