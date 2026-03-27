import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\x1b[33mYOU > \x1b[0m' // Yellow prompt
});

console.log('\x1b[36m--- WAR-MACHINE TERMINAL ---\x1b[0m');
rl.prompt();

rl.on('line', async (line) => {
    const prompt = line.trim();
    if (!prompt) { rl.prompt(); return; }

    process.stdout.write('\x1b[32mAI > \x1b[0m'); // Green AI prefix

    try {
        const response = await fetch('http://127.0.0.1:3000/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // Decodes the stream chunk and prints it immediately
            process.stdout.write(decoder.decode(value));
        }
        process.stdout.write('\n\n');
    } catch (err) {
        console.error('\n\x1b[31mError:\x1b[0m Could not connect to server.');
    }

    rl.prompt();
}).on('close', () => {
    console.log('\nGoodbye.');
    process.exit(0);
});