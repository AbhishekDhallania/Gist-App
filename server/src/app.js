import express from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

import initPassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import Gistrouter from "./routes/gistRoutes.js";
import cors from 'cors'
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


const PORT = process.env.PORT || 5000;

connectDB()

app.use(express.json())

app.use("/auth", authRoutes);
app.use("/gist",Gistrouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
initPassport(passport)

app.listen(PORT, () => console.log(`Gist App running on ${PORT}`));
