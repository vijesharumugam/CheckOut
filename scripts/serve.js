import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    configFile: './vite.config.js',
    server: {
      port: 3000,
    },
  });

  await server.listen();
  console.log('Vite server running at http://localhost:3000');

  const cleanExit = async () => {
    try {
      await server.close();
    } finally {
      process.exit(0);
    }
  };

  process.on('SIGTERM', cleanExit);
  process.on('SIGINT', cleanExit);
  process.stdin.on('close', cleanExit);
}

start();
