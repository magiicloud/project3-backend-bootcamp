import cors from "cors";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { ItemsRouter } from "./routers/itemsRouter";
import { BuildingsRouter } from "./routers/buildingsRouter";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH_API,
  issuerBaseURL: process.env.AUTH_DOMAIN,
});

// This route doesn't need authentication
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

// Enable CORS access to this server
app.use(cors());

//JSON middleware
app.use(express.json());

// Routers
const itemsRouter = new ItemsRouter().routes();
const buildingsRouter = new BuildingsRouter().routes();

app.use(itemsRouter);
app.use(buildingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
