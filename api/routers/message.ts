import express from 'express';
import multer from 'multer';
import fileDb from '../fileDB';

const messagesRouter = express.Router();
const upload = multer({ dest: 'public/images/' });

messagesRouter.get('/', async (req, res) => {
        const messages = await fileDb.getMessages();
        res.send(messages);
});

// @ts-ignore
messagesRouter.post('/', upload.single('image'), async (req, res) => {
    const { author, message } = req.body;

    if (!message) {
        return res.status(400).send({ error: 'Message is required!' });
    }

    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    const newMessage = await fileDb.addMessage({
        author: author || 'Anonymous',
        message,
        image: imagePath
    });
    res.status(201).send(newMessage);
});

export default messagesRouter;
