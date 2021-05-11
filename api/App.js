var express = require("express");
var cors = require("cors");
var app = express();
const api = require("./data.json");
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync("api.json");
// const api = low(adapter);
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app.use(cors());
app.use(express.json());
// app.api = api;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ExampleApi",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["app.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
/**
 * @swagger
 * /{Api}:
 *   get:
 *     summary: Get Example
 *     parameters:
 *       - in: path
 *         name: Api
 *         schema:
 *           type: string
 *         required: true
 *         description: The Api of method
 *     responses:
 *       200:
 *         description: The method description by Api
 *       404:
 *         description: The method was not found
 */
app.get("/:id", function (req, res) {
  let x = Object.keys(api);
  if (x.find(e => e === req.params.id) !== undefined) {
    res.json(api[x.find(e => e === req.params.id)]);
  } else {
    res.sendStatus(404);
  }
});
app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 80");
});
