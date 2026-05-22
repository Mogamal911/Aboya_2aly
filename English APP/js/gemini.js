import { Storage } from './storage.js';

  function getKey() {
    return Storage.getSettings().geminiApiKey || '';
  }

  function hasKey() {
    const key = getKey();
    return key && key.trim().length > 0;
  }

  async function callGemini(prompt, systemInstruction = '', responseSchema = null, isProModel = false) {
    const key = getKey();
    if (!key) {
      throw new Error('Gemini API key is not configured in Settings.');
    }

    const modelName = isProModel ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [
          {
            text: systemInstruction
          }
        ]
      };
    }

    if (responseSchema) {
      requestBody.generationConfig.responseSchema = responseSchema;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    try {
      const text = data.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response parts:', data, parseErr);
      throw new Error('Gemini returned an invalid response structure.');
    }
  }

  export const GeminiAPI = {
    getKey,
    hasKey,
    callGemini
  };
