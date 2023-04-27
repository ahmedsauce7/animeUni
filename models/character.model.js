const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const characterSchema = new Schema(
  {
    username: {
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
        type: string
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("character", characterSchema);

module.exports = character;
