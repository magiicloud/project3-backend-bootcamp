const cors = require("cors");
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH_API,
  issuerBaseURL: process.env.AUTH_DOMAIN,
});

// Enable CORS access to this server
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
