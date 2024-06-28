const Tag = require("./model");

const create = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = new Tag(payload);
    await tag.save();
    return res.json(tag);
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
    let payload = req.body;
    let tag = await Tag.findById(id);
    await tag.save();
    return res.json(tag);
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
    let tag = await Tag.find().skip(parseInt(skip)).limit(parseInt(limit));
    return res.json(tag);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    let tag = await Tag.findByIdAndDelete(req.params.id);

    return res.json(tag);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, update, destroy };
