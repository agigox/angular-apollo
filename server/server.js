const express = require("express");
const mongoose = require("./config/mongoose");
const graphqlHTTP = require("express-graphql");
const path = require("path");
const schema = require("./schema");
mongoose();
const cors = require("cors");
const app = express();

app.use("*", cors());
// Create link to Angular build directory
var distDir = path.resolve(__dirname, '..') + "/dist/";
app.use(express.static(distDir));

// create a single entry point for any client that he wants to interact with our graphql server
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
);

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log("A GraphQL API running at port 4000");
});

