const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "give password to access phonebook or add password, entry name and entry number to make a new entry"
  );
  process.exit(1);
}

const password = process.argv[2];
const entryName = process.argv[3];
const entryNumber = process.argv[4];

const url = `mongodb+srv://vovandarius:${password}@cluster0.y5bljs1.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Number = mongoose.model("Number", numberSchema);

const number = new Number({
  name: entryName,
  number: entryNumber,
});

if (process.argv.length === 3) {
  Number.find({}).then((result) => {
    console.log(
      `phonebook:\n${result.map((n) => `${n.name}: ${n.number}`).join("\n")}`
    );
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  number.save().then((result) => {
    console.log(
      `${entryName}'s number ${entryNumber} has been added to the phonebook!`
    );
    mongoose.connection.close();
  });
} else {
  console.log(
    "The number of arguments is confusing. Edit the command and try again!"
  );
  process.exit(1);
}
