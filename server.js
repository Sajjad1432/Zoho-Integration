const app = require('./app');
const keys = require('./config/keys');

const port = keys.port || 5000;

const server = app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1)
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1)
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully!');
  server.close(() => {
    console.log('Process terminated!');
  });
});