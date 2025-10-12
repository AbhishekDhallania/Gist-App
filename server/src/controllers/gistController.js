import Gist from "../models/Gist.js"

// Create Gist
async function createGist(req, res) {
    try {
        const { title, code, language } = req.body

        if (!title || !code || !language) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const userId = req.user._id
        const gistAlreadyExist = await Gist.findOne({
            owner: userId,
            title,
            language
        });

        if (gistAlreadyExist) {
            return res.status(400).json({ error: "Gist already exist with same name" });
        }

        const gist = await Gist.create({
            owner: userId,
            title,
            language,
            code,
            createdAt: new Date()
        });
        res.status(201).json(gist);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all gist of the owner
async function getGistsOfOwner(req, res) {
    try {
        const ownerId = req.user._id;
        const gists = await Gist.find({ owner: ownerId }).sort({createdAt : 1})
        return res.status(200).json(gists);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a Gist
async function deleteGist(req, res) {
    try {
        const id = req.params.id
        const userId = req.user._id
        if(!id) {
            return res.status(400).send('Gist Id Required')
        }
        const gist = await Gist.findById(id);
        if (!gist) {
            return res.status(404).json({ error: "Gist not found" });
        }
        if (gist.owner.toString() !== userId.toString()) {
            return res.status(403).json({
                error: "You are not authorized; Only owner can Delete their Gist"
            })
        }
        await gist.deleteOne()
        return res.status(200).json({ msg: "Gist Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function fetchGist(req,res) {
    const id = req.params.id
    if(!id) {
        return res.status(400).send('Gist id required')
    }
    const gist = await Gist.findById(id)
    if(!gist) {
        return res.status(404).send('Gist not found')
    }
    return res.status(200).json({gist})
}
export {
    createGist, 
    deleteGist, 
    getGistsOfOwner,
    fetchGist 
}
