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

// Enable CORS access to this server
app.use(cors());

// Routers
const itemsRouter = new ItemsRouter().routes();
const buildingsRouter = new BuildingsRouter().routes();

app.use(itemsRouter);
app.use(buildingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
