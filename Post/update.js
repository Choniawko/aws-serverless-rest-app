const AWS = require("aws-sdk")

const client = new AWS.DynamoDB.DocumentClient()

const BLOG_TABLE = process.env.BLOG_TABLE

module.exports.run = async event => {
    const { postId, title, content } = JSON.parse(event.body)
    const params = {
        TableName: BLOG_TABLE,
        Key: { postId },
        Item: {
            postId,
            title,
            content,
            active
        },
        ExpressionAttributeValues: {
            ":title": title,
            ":content": content,
            ":active": active
        },
        UpdateExpression:
            "SET title = :title, content = :content, active = :active",
        ReturnValues: "ALL_NEW"
    }
    try {
        await client.update(params).promise()
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
