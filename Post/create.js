const uuid = require("uuid/v4")
const AWS = require("aws-sdk")

const client = new AWS.DynamoDB.DocumentClient()

const BLOG_TABLE = process.env.BLOG_TABLE

module.exports.run = async event => {
    console.log({ event })
    const { title, content } = JSON.parse(event.body)
    const params = {
        TableName: BLOG_TABLE,
        Item: {
            postId: uuid(),
            title,
            content,
            active: false
        }
    }
    try {
        await client.put(params).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
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
