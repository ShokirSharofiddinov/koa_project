const Router = require("@koa/router");
const userRoutes = require("./user.routes");

const router = Router();

router.use("/api/user", userRoutes())

module.exports = () => router.routes();
