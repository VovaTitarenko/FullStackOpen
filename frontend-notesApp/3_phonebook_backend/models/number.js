const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then((success) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const numberSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{1,3}-\d{2,3}-\d{5,7}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Remember: the first character has to be a digit followed by a single hyphen, then 3 digits of the code followed by another hyphen, and the last 7 characters have to be digits.`,
    },
    minLength: 8,
    required: true,
  },
});

numberSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Number", numberSchema);
