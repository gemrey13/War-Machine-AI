import express from 'express';
import { Ollama } from 'ollama';

const app = express();
app.use(express.json());

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Headers for streaming text
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        const stream = await ollama.chat({
            model: 'war-machine',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        for await (const part of stream) {
            // Only send to the client (res), no local console.log here
            res.write(part.message.content);
        }

        res.end();
    } catch (error) {
        console.error("Connection Error:", error.message);
        if (!res.headersSent) {
            res.status(500).send("Ollama link severed.");
        } else {
            res.end();
        }
    }
});

app.listen(3000, () => console.log(`🚀 War-Machine API Live on port 3000`));