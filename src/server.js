import { config } from 'dotenv';
config();

import express from 'express';
import { connectDB, disconnectDB } from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js'
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist",watchlistRoutes)

const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});


//Handle uncaught execeptions
process.on("uncaughtException",(err)=>{
    console.error("Uncaught Exception: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Signal to terminate service before exiting formally
process.on("SIGTERM",()=>{
    console.error("SIGTERM recieved shutting down");
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

