const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST']
  }
});

io.on("connection", socket => {
  socket.on('send-text-changes', delta => {
    socket.broadcast.emit('receive-text-changes', delta);
  });

  socket.on('send-code-changes', delta => {
    socket.broadcast.emit('receive-code-changes', delta);
  })
});
