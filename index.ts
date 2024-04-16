import cors from "cors";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { ItemsRouter } from "./routers/itemsRouter";
import { BuildingsRouter } from "./routers/buildingsRouter";
import { CartRouter } from "./routers/cartRouter";
import { DashRouter } from "./routers/dashRouter";
import { UsersRouter } from "./routers/usersRouter";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH_API,
  issuerBaseURL: process.env.AUTH_DOMAIN,
});

// Enable CORS access to this server
app.use(cors());

//JSON middleware
app.use(express.json());

// Routers
const itemsRouter = new ItemsRouter().routes();
const buildingsRouter = new BuildingsRouter().routes();
const cartRouter = new CartRouter().routes();
const dashRouter = new DashRouter().routes();
const usersrouter = new UsersRouter().routes();

app.use(checkJwt, itemsRouter);
app.use(checkJwt, buildingsRouter);
app.use(checkJwt, cartRouter);
app.use(checkJwt, dashRouter);
app.use(checkJwt, usersrouter);
// app.use(itemsRouter);
// app.use(buildingsRouter);
// app.use(cartRouter);
// app.use(dashRouter);
// app.use(usersrouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
