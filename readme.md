# 🦾 War-Machine AI

A high-performance, local AI character integration using **Node.js (ES Modules)** and **Ollama**. 
This project is specifically tuned for the **Intel i5-1235U** with **16GB RAM**, focusing on 
bypassing Windows DNS latency and providing real-time streaming.

---

## 🚀 Features
* **Custom Personality:** A "War-Machine" persona defined via a dedicated `Modelfile`.
* **Zero-Lag Networking:** Direct IPv4 (`127.0.0.1`) binding to skip the 2-second Windows `localhost` lookup delay.
* **Real-Time Streaming:** Uses HTTP chunked encoding to deliver words the millisecond they are generated.
* **RAM Optimized:** Includes `keep_alive` logic to ensure the model stays in your 16GB RAM.

---

## 🛠️ Hardware Context
* **Processor:** 12th Gen Intel Core i5-1235U (2 P-Cores, 8 E-Cores).
* **RAM:** 16GB DDR4/DDR5.
* **Performance Note:** On this CPU, expect roughly **5-8 tokens per second**. 
  Streaming is enabled to ensure "First Token" delivery in **< 1.5s**.

---

## 📥 Setup Instructions

### 1. Install Ollama
Download the engine at [ollama.com](https://ollama.com). Ensure the Ollama icon is visible in your system tray.

### 2. Project Initialization
```bash
# Initialize and install dependencies
npm init -y
npm install express ollama
npm pkg set type="module"
```

### 3. Build the Character
Ensure you have a file named `Modelfile` in your root directory. Then, register the character:
```bash
# Run via terminal
ollama create war-machine -f Modelfile
```

### 4. Ignite the Server
```bash
node server.js
```

---

## 📡 API Reference

### **POST** `/ask`
The primary endpoint for interacting with War-Machine.

**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "prompt": "War-Machine, what is your current status?"
}
```

**Testing via PowerShell (cURL):**
```powershell
curl.exe -X POST [http://127.0.0.1:3000/ask](http://127.0.0.1:3000/ask) `
-H "Content-Type: application/json" `
-d '{"prompt": "Give me a status report on the CPU cores."}'
```

---

## ⚙️ Key Optimizations Applied
1. **Direct IP:** Changed `localhost` to `127.0.0.1` in the client to stop DNS lag.
2. **Streaming Loop:** Implemented `for await (const part of stream)` to pipe output directly.
3. **Keep-Alive:** Added `keep_alive: '30m'` to prevent the i5 from reloading from SSD.

---

## 📜 License
MIT - Created for the War-Machine Project. 🤖🦾
"""