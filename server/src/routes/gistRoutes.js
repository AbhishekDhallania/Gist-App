import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { createGist, deleteGist, getGistsOfOwner,fetchGist } from "../controllers/gistController.js"
const Gistrouter = express.Router();

Gistrouter.post("/create", authMiddleware, createGist);
Gistrouter.get("/mygists", authMiddleware, getGistsOfOwner);
Gistrouter.delete("/delete/:id", authMiddleware, deleteGist);
Gistrouter.get('/:id',authMiddleware,fetchGist)

export default Gistrouter;