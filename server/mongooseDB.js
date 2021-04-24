const mongoose = require("mongoose");

const Code = require("./models/Code");
const Document = require("./models/Documents");

mongoose.connect(
  "mongodb+srv://aakritsubedi:subedi12@@cluster0.saj83.mongodb.net/docs?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const findOrCreateDataStore = async (id, type) => {
  if (id == null) return null;

  let dataStore;
  if (type === "document") {
    dataStore = await Document.findById(id);
  } else if (type === "code") {
    dataStore = await Code.findById(id);
  }

  if (dataStore) return dataStore;

  if (type === "document") {
    return await Document.create({ _id: id, data: "" });
  } else if (type === "code") {
    return await Code.create({ _id: id, data: "//type your code here..." });
  }
};

const saveDataStore = async (documentId, data, type) => {
  if (documentId == null) return null;

  let dataStore;
  if (type === "document") {
    dataStore = await Document.findByIdAndUpdate(documentId, { data });
  } else if (type === "code") {
    dataStore = await Code.findByIdAndUpdate(documentId, { data });
  }

  return dataStore;
};

module.exports = {
  saveDataStore,
  findOrCreateDataStore,
};
