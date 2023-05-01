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
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Character = model("Character", characterSchema);

module.exports = Character;
