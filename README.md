OLLAMA-CHAT
=
React frontend for a local Ollama container

# Step 1: Run your Ollama Docker Container
Launching your Ollama container with `OLLAMA_ORIGINS="*" environment variable. If your container is already running without it, stop it and re-run it like this:

    docker run -d \
    -e OLLAMA_ORIGINS="*" \
    -p 11434:11434 \
    -v ollama:/root/.ollama \
    --name ollama \
    ollama/ollama
# Step 2: List and download models to your running containers
    docker exec -it ollama bash
    ollama list
    ollama pull llama3.2
    ollama pull qwen2.5
# Step 3: pull and run this project
    git clone https://github.com/rupp-ite/ollama-chat.git
    npm install
    npm run dev