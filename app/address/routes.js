const router = require("express").Router();
const { police_check } = require("../../middlewares");
const addressController = require("./controller");

router.get(
  "/addresses",
  police_check("view", "Address"),
  addressController.index
);

router.post(
  "/addresses",
  police_check("create", "Address"),
  addressController.create
);

router.put("/addresses/:id", addressController.update);

router.delete("/addresses/:id", addressController.destroy);

module.exports = router;
