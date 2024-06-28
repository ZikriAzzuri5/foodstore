const router = require("express").Router();
const { police_check } = require("../../middlewares");
const orderController = require("./controller");

router.get("/orders", police_check("view", "Order"), orderController.index);

router.post("/orders", police_check("create", "Order"), orderController.create);

module.exports = router;
