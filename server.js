import express from 'express';
import { Ollama } from 'ollama';

const app = express();
app.use(express.json());

// 1. Fixed Host to avoid DNS lag
const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;

    try {
        console.time("FirstTokenTime");
        
        // 1. Set headers so the client knows to expect a stream
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        const stream = await ollama.chat({
            model: 'war-machine',
            messages: [{ role: 'user', content: prompt }],
            stream: true, // Keep this true
        });

        let firstToken = true;

        for await (const part of stream) {
            if (firstToken) {
                console.timeEnd("FirstTokenTime"); // Shows how fast the first word arrived
                firstToken = false;
            }

            // 2. Write each chunk to the response immediately
            res.write(part.message.content);
            
            // Also log to your terminal so you can see it working
            process.stdout.write(part.message.content);
        }

        // 3. End the response once the stream is finished
        res.end();

    } catch (error) {
        console.error("Stream Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Ollama link severed." });
        } else {
            res.end();
        }
    }
});

app.listen(3000, () => console.log(`🚀 War-Machine Ready on 127.0.0.1:3000`));