const Router = require("@koa/router");
const { addUser, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

const router = Router();

router.post("/add", addUser);
router.get("/", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = () => router.routes();
