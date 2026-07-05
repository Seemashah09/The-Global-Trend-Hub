// Function to fetch the API key safely without hardcoding it
function getSecureApiKey() {
    let key = localStorage.getItem('my_gemini_key');
    
    // If the browser doesn't have the key saved yet, ask you for it
    if (!key) {
        key = prompt("Please enter your Gemini API Key (This is saved only inside your personal browser):");
        if (key) {
            localStorage.setItem('my_gemini_key', key);
        }
    }
    return key;
}

// Your main function to call the AI
async function generateAICorrespondence(userPrompt) {
    const apiKey = getSecureApiKey();
    
    if (!apiKey) {
        alert("An API Key is required to use the AI features.");
        return;
    }

    // Initialize the Gemini client dynamically using the safe key
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    try {
        const response = await ai.create({
            model: "gemini-2.5-flash", // Using the updated fast model
            input: userPrompt,
        });
        
        console.log("AI Response:", response.output_text);
        return response.output_text;
    } catch (error) {
        console.error("AI Generation failed:", error);
        // If the key was invalid or wrong, clear it so you can re-type it next time
        localStorage.removeItem('my_gemini_key');
    }
}
