const serverless = require("serverless-http")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const AWS = require("aws-sdk")

const BLOG_TABLE = process.env.BLOG_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

app.use(bodyParser.json({ strict: false }))
app.get("/", (req, res) => {
    res.json({ message: "API server" })
})

module.exports.handler = serverless(app)
