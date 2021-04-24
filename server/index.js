const { findOrCreateDataStore, saveDataStore } = require("./mongooseDB");

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Text Editor
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDataStore(documentId, "document");

    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-text-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-text-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await saveDataStore(documentId, data, "document");
    });
  });

  // Code Editor
  socket.on("get-editor", async (documentId) => {
    const code = await findOrCreateDataStore(documentId, "code");

    socket.join(documentId);
    socket.emit("load-editor", code.data);

    socket.on("send-code-changes", (code) => {
      socket.broadcast.to(documentId).emit("receive-code-changes", code);
    });

    socket.on("save-code", async (data) => {
      await saveDataStore(documentId, data, "code");
    });
  });
});
