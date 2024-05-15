export const POSTGRES_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    database: 'chessdb',
    password: 'password',
    port: 5432,
  };
  
  export const REDIS_CONFIG = {
    host: 'localhost',
    port: 6379,
  };
  
  const ENV = {
    VITE_SERVER: process.env.VITE_SERVER || 'http://localhost:3000',
    VITE_ORIGIN: process.env.VITE_ORIGIN || 'http://localhost:5173',
    VITE_CHAT_URL: process.env.VITE_CHAT_URL || 'ws://localhost:8080',
    JWT_SECRET: process.env.JWT_SECRET || 'temporarytest',
    PORT: process.env.PORT || 3000
  };
  
  export default ENV;
  