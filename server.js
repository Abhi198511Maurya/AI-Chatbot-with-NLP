import "dotenv/config";
import { NlpManager } from 'node-nlp';
import connectDB from "./config/db.js";
import Message from "./models/Message.js";

import express from "express";
const app = express();

app.use(express.json());
connectDB();

const manager = new NlpManager({ languages: ['en'], forceNER: true });

(async () => {
    // Adds the utterances and intents for the NLP
    manager.addDocument('en', 'goodbye for now', 'greetings.bye');
    manager.addDocument('en', 'bye bye take care', 'greetings.bye');
    manager.addDocument('en', 'okay see you later', 'greetings.bye');
    manager.addDocument('en', 'bye for now', 'greetings.bye');
    manager.addDocument('en', 'i must go', 'greetings.bye');
    manager.addDocument('en', 'hello', 'greetings.hello');
    manager.addDocument('en', 'namaste', 'greetings.hello');
    manager.addDocument('en', 'hi', 'greetings.hello');
    manager.addDocument('en', 'howdy', 'greetings.hello');

    // Train also the NLG
    manager.addAnswer('en', 'greetings.bye', 'Till next time');
    manager.addAnswer('en', 'greetings.bye', 'see you soon!');
    manager.addAnswer('en', 'greetings.hello', 'Hey there!');
    manager.addAnswer('en', 'greetings.hello', 'Greetings!');
    await manager.train();
    manager.save();
})();

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { userId = 'anonymous', text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const result = await manager.process('en', text);
    const reply = result.answer || "Sorry, I didn't understand that.";

    // Log conversation
    await Message.create({
        userId,
        text,
        reply,
        intent: result.intent,
        entities: result.entities
    });

    res.json({ reply, intent: result.intent, entities: result.entities });
});

// Retrieve chats
app.get('/api/history/:userId', async (req, res) => {
    const history = await Message.find({ userId: req.params.userId })
        .sort({ timestamp: 1 });
    res.json(history);
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`app listening at port ${port}`);
})