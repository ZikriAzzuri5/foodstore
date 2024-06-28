const { policyFor } = require("../../utils");
const Category = require("./model");

const show = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    let subjectInvoice = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });

    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "You are not allowed to access invoice",
      });
    }

    let { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");

    return res.json(invoice);
  } catch (error) {
    next(error);
  }
};

module.exports = { show };
