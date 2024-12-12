import express from 'express';
import messagesRouter from './routers/message';
import fileDb from './fileDB';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors())

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/messages', messagesRouter);


const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(console.error);
