import { promises as fs } from 'fs';
import * as crypto from "node:crypto";
import {Message} from "./types";

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString());
        } catch (err) {
            data = [];
            await this.save();
            console.error(err);
        }
    },
    async getMessages() {
        return data;
    },
    async addMessage(item: Omit<Message, 'id'>) {
        const id = crypto.randomUUID()
        const newItem = { id, ...item };
        data.push(newItem);
        await this.save();
        return newItem;
    },
    async save() {
        try {
            await fs.writeFile(fileName, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error(err);
        }
    }
};

export default fileDb;