const { subject } = require("@casl/ability");
const { policyFor } = require("../../utils");
const Address = require("./model");

const create = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    let address = new Address({ ...payload, user: user._id });
    await address.save();

    return res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let { _id, ...payload } = req.body;
    let { id } = req.params;

    let address = await Address.findById(id);
    let subjectAddress = subject("Address", {
      ...address,
      user_id: address.user,
    });

    let policy = policyFor(req.user);
    console.log(policy);
    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You are not allowed to modify this resource",
      });
    }

    address = await Address.findByIdAndUpdate(id, payload, { new: true });

    return res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await Address.find({ user: req.user_id }).countDocuments();
    let address = await Address.find({ user: req.user_id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    return res.json({ data: address, count });
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    let { id } = req.params;
    let address = await Address.findById(id);
    let subjectAddress = subject("Address", {
      ...address,
      user_id: address.user,
    });
    let policy = policyFor(req.user);

    if (!policy.can("delete", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You are not allowed to delete this resource",
      });
    }
    address = await Address.findByIdAndDelete(id);
    return res.json(address);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, update, destroy };
