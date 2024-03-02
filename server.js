const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAIAPIKey } = require('./config'); // Add this line
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: process.env.ORIGIN_FOR_CORS,
      methods: ['POST', 'GET', 'PUT', 'DELETE'],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: '*',
      methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true,
    })
  );
}

// Function to split text into smaller chunks
function splitText(text) {
  const maxChunkSize = 2048;
  const chunks = [];
  let currentChunk = "";

  // Split the text by sentences (assuming sentences end with ".")
  const sentences = text.split('.');

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length < maxChunkSize) {
      currentChunk += sentence + '.';
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + '.';
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Function to introduce a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/summarize', async (req, res) => {
  const { document } = req.body;

  // Split document into smaller chunks
  const documentChunks = splitText(document);

  // Log the smaller text chunks
  console.log('Smaller Text Chunks:', documentChunks);

  // Call OpenAI API for document summarization for each chunk
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Updated API endpoint

  try {
    let summary = ''; // Initialize summary variable outside the loop

    // for (const chunk of documentChunks) {
    //   // Add user message with the current chunk
    //   const messages = [
    //     { role: 'user', content: `Please summarize the following information: ${chunk}` },
    //     { role: 'assistant', content: 'You are a good content writer.' },
    //   ];

    //   console.log('API Request Payload:', {
    //     messages,
    //     model: 'gpt-3.5-turbo',
    //   });

    for (const chunk of documentChunks) {
      // Add assistant message as content writer
      const assistantMessage = { role: 'assistant', content: 'ChatGPT is summarizing the information.' };
    
      // Add user message with the current chunk
      const userMessage = { role: 'user', content: chunk };
    
      // Combine messages
      const messages = [assistantMessage, userMessage];
    
      console.log('API Request Payload:', {
        messages,
        model: 'gpt-3.5-turbo',
      });

      // Introduce a delay of 2 seconds (2000 milliseconds) between API requests
      await delay(2000);

      const response = await axios.post(apiUrl, {
        messages,
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OpenAIAPIKey}`,
        },
      });

      console.log('API Response:', response.data); // Log the complete API response
      // const summaryChunk = response.data.choices[0].text;
      const summaryChunk = response.data.choices[0].message.content;
      summary += summaryChunk; // Append the summary of each chunk

      console.log('Summary Chunk:', summaryChunk);
    }

    res.json({ summary });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message, error.response.data);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//-----------------------------------------------------------------------------------------
// Add this code to handle translation
// app.post('/translate', async (req, res) => {
//   const { document, targetLanguage } = req.body;
  
//   try {
//     const translationResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant that translates text.' },
//         { role: 'user', content: document },
//       ],
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${OpenAIAPIKey}`,
//       },
//     });
//     console.log('API Response:', response.data);


//     const translation = translationResponse.data.choices[0].message.content;
//     res.json({ translation });
//   } catch (error) {
//     console.error('Error translating document:', error.message);
//     res.status(500).json({ error: 'Internal Server Error', details: error.message });
//   }
// });

app.post('/translate', async (req, res) => {
  const { document, targetLanguage } = req.body;

  try {
    const translationResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that translates text.' },
        { role: 'user', content: `Translate the following text to ${targetLanguage}: ${document}` },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OpenAIAPIKey}`,
      },
    });

    console.log('API Response:', translationResponse.data); // Correct the variable name

    const translation = translationResponse.data.choices[0].message.content;
    res.json({ translation });
  } catch (error) {
    console.error('Error translating document:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


