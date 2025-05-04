import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db/connection';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 5050;

app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || '*'); // Allow all origins
  },
  credentials: true,
}));


// Middleware
app.use(express.json());

async function startServer() {
  try {
    await connectToDatabase();
    app.use('/api/user', userRoutes);
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

startServer();
