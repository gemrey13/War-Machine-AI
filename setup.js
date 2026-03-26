const { execSync } = require('child_process');

console.log("🦾 Initializing War-Machine Systems...");

try {
    // This command tells Ollama to read your Modelfile and create the 'war-machine' model
    execSync('ollama create war-machine -f Modelfile', { stdio: 'inherit' });
    console.log("\n✅ War-Machine is now part of your local LLM library.");
} catch (error) {
    console.error("❌ Failed to create model. Ensure Ollama is running in the background.");
}