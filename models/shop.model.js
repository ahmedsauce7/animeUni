const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const shopSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    amount: {
      type: String,
      required: true,
    },
    money: {
      type: Number
    },
  },
  {
    // this second object adds extra properties: createdAt and updatedAt
    timestamps: true
  }
);

const shop = model("shop", userSchema);

module.exports = shop;