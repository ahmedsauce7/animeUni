const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    universe: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true
    },
    nickname: {
        type: String,
      required: true
    },

    weakness: {
        type: String,
      required: true
    },
    weapon: {
        type: String,
      required: true
    },
    image: {
        type: String,
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    shop: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
      validate: [
        (items) => items.length <= 4,
        "Shop can only have a maximum of 3 items"
      ]
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Character = model("Character", characterSchema);

module.exports = Character;
