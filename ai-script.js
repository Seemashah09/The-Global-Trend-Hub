mport { GoogleGenAI } from 'https://esm.run';

// Paste your AQ. key inside the single quotes below
const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6JVPl3DbNeCCN7-z1ik5ju8Sbx0ywSxmuBTCtZ0q1sUcw' });

const inputField = document.getElementById('aiInput');
const submitBtn = document.getElementById('aiBtn');
const outputDisplay = document.getElementById('aiOutput');

async function callGoogleAI() {
  const userText = inputField.value.trim();
  if (!userText) {
    outputDisplay.innerText = "Please type something first!";
    return;
  }
  
  submitBtn.innerText = "Thinking...";
  submitBtn.disabled = true;
  outputDisplay.innerText = "Connecting to Google AI...";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: userText,
    });
    outputDisplay.innerText = response.text;
  } catch (error) {
    console.error(error);
    outputDisplay.innerText = "Error: Could not reach AI. Try again.";
  } finally {
    submitBtn.innerText = "Send to AI";
    submitBtn.disabled = false;
  }
}

submitBtn.addEventListener('click', callGoogleAI);
