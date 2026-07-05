import { GoogleGenAI } from "@google/genai";

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
        return null;
    }

    try {
        // Initialize the Gemini client using the browser module syntax
        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        // Correct browser SDK method syntax for generation
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("AI Generation failed:", error);
        // If the key was invalid or expired, clear it so you can re-type it
        localStorage.removeItem('my_gemini_key');
        return null;
    }
}

// Explicitly attach the function to the window object so the HTML button can access it
window.generateAICorrespondence = generateAICorrespondence;
