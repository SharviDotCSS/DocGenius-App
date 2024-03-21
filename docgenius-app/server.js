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

//summary working, without wordlimit
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.post('/summarize', async (req, res) => {
//   const { document } = req.body;

//   // Split document into smaller chunks
//   const documentChunks = splitText(document);

//   // Log the smaller text chunks
//   console.log('Smaller Text Chunks:', documentChunks);

//   // Call OpenAI API for document summarization for each chunk
//   const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Updated API endpoint

//   try {
//     let summary = ''; // Initialize summary variable outside the loop

//     // for (const chunk of documentChunks) {
//     //   // Add user message with the current chunk
//     //   const messages = [
//     //     { role: 'user', content: `Please summarize the following information: ${chunk}` },
//     //     { role: 'assistant', content: 'You are a good content writer.' },
//     //   ];

//     //   console.log('API Request Payload:', {
//     //     messages,
//     //     model: 'gpt-3.5-turbo',
//     //   });

//     for (const chunk of documentChunks) {
//       // Add assistant message as content writer
//       const assistantMessage = { role: 'assistant', content: 'ChatGPT is summarizing the information.' };
    
//       // Add user message with the current chunk
//       const userMessage = { role: 'user', content: chunk };
    
//       // Combine messages
//       const messages = [assistantMessage, userMessage];
    
//       console.log('API Request Payload:', {
//         messages,
//         model: 'gpt-3.5-turbo',
//       });

//       // Introduce a delay of 2 seconds (2000 milliseconds) between API requests
//       await delay(2000);

//       const response = await axios.post(apiUrl, {
//         messages,
//         model: 'gpt-3.5-turbo',
//         max_tokens: 150,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OpenAIAPIKey}`,
//         },
//       });

//       console.log('API Response:', response.data); // Log the complete API response
//       // const summaryChunk = response.data.choices[0].text;
//       const summaryChunk = response.data.choices[0].message.content;
//       summary += summaryChunk; // Append the summary of each chunk

//       console.log('Summary Chunk:', summaryChunk);
//     }

//     res.json({ summary });
//   } catch (error) {
//     console.error('Error calling OpenAI API:', error.message, error.response.data);
//     res.status(500).json({ error: 'Internal Server Error', details: error.message });
//   }
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


//wordlimit
app.post('/summarize', async (req, res) => {
  let { document, wordLimit } = req.body; // Extract word limit from request body

  // Convert wordLimit to integer
  wordLimit = parseInt(wordLimit);

  // Split document into smaller chunks
  const documentChunks = splitText(document);

  // Log the smaller text chunks
  console.log('Smaller Text Chunks:', documentChunks);

  // Call OpenAI API for document summarization for each chunk
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Updated API endpoint

  try {
    let summary = ''; // Initialize summary variable outside the loop

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
      await delay(200);

      const response = await axios.post(apiUrl, {
        messages,
        model: 'gpt-3.5-turbo',
        max_tokens: wordLimit, // Use the selected word limit
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OpenAIAPIKey}`,
        },
      });

      console.log('API Response:', response.data); // Log the complete API response
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
//--------------------------------------------------------------------------------
//keywords
app.post('/getKeywords', async (req, res) => {
  const { document } = req.body;

  // Split document into smaller chunks
  const documentChunks = splitText(document);

  // Initialize an empty string to store keywords
  let keywords = '';

  // Call OpenAI API for keyword extraction for each chunk
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Updated API endpoint for keyword extraction

  try {
    for (const chunk of documentChunks) {
      // Add assistant message as content writer
      const assistantMessage = { role: 'assistant', content: 'ChatGPT is extracting keywords.' };
    
      // Add user message with the current chunk
      const userMessage = { role: 'user', content: chunk };
    
      // Combine messages
      const messages = [assistantMessage, userMessage];
    
      // Introduce a delay of 2 seconds (2000 milliseconds) between API requests
      await delay(3000);

      const response = await axios.post(apiUrl, {
        messages,
        model: 'gpt-3.5-turbo',
        max_tokens: 50, // Use a fixed max_tokens value
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OpenAIAPIKey}`,
        },
      });

      // Extract keywords from the API response and add them to the keywords string
      const keywordChunk = response.data.choices[0].message.content;
      keywords += keywordChunk; // Append the keywords of each chunk
    }

    res.json({ keywords });
  } catch (error) {
    console.error('Error calling OpenAI API for keywords:', error.message);

    // Check if the error object has a response property before accessing its data
    if (error.response && error.response.data) {
      console.error('Response data:', error.response.data);
    } else {
      console.error('No response data available');
    }

    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});




//  const PORT = process.env.PORT || 8080;
//  app.listen(PORT, () => {
//    console.log(`Server is running on http://localhost:${PORT}`);
//  });


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

    // console.log('API Response:', translationResponse.data); // Correct the variable name

    const translation = translationResponse.data.choices[0].message.content;
    res.json({ translation });
  } catch (error) {
    console.error('Error translating document:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

//--------------------------------------------------------------------------------
//Sentimental analysis
app.post('/sentiment', async (req, res) => {
  const { document } = req.body;

  try {
    const sentimentResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that performs sentiment analysis.' },
        { role: 'user', content: document },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OpenAIAPIKey}`,
      },
    });

    // console.log('API Response for sentimental analysis:', sentimentResponse.data);

    const sentiment = sentimentResponse.data.choices[0].message.content;
    res.json({ sentiment });
  } catch (error) {
    console.error('Error analyzing sentiment:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

//--------------------------------------------------------------------------------
//Visual representation 1
// app.post('/generate-chart', async (req, res) => {
//   const { document } = req.body;

//   try {
//     // Call ChatGPT API to generate chart code based on the document
//     const chartResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'Give me "char.js" code for representing this data visually .' },
//         { role: 'user', content: document },
//       ],
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${OpenAIAPIKey}`,
//       },
//     });

//     console.log('API Response for visual representation:', chartResponse.data);

//     // Extract chart code from API response
//     const chartCode = chartResponse.data.choices[0].message.content;
//     console.log("chartcode: ", chartCode);

//     // Send chart code as JSON response
//     res.json({ chartCode });
//   } catch (error) {
//     console.error('Error generating chart code:', error.message);
//     res.status(500).json({ error: 'Internal Server Error', details: error.message });
//   }
// });

//2
app.use(bodyParser.json());

app.post('/generate-chart', async (req, res) => {
  const { documentContent } = req.body;

  try {
    // Craft a prompt for the OpenAI API to analyze the document and suggest a chart configuration
    const prompt = `Suggest an appropriate chart type and data representation for the following document:\n${documentContent}\n\nLabels: An array containing labels for each data point (e.g., categories, dates).\nData: An array containing the actual data values for your chart.`;


    // Call OpenAI API to generate a chart configuration
    const chartConfig = await callOpenAIForChartConfig(prompt);

    // Send chart configuration as response
    res.json({ chartConfig });
  } catch (error) {
    console.error('Error generating chart configuration:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

async function callOpenAIForChartConfig(prompt) {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-002', // Choose appropriate model
      prompt,
      max_tokens: 200,
      temperature: 0.7,
      stop: ['\n'],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OpenAIAPIKey}`,
      },
    });

    const chartConfig = response.data.choices[0].text;
    console.log('OpenAI Response:', chartConfig); // Log the response
    return chartConfig;

    // return response.data.choices[0].text;
    
  } 
  catch (error) {
    throw new Error('Failed to generate chart configuration using OpenAI.');
  }
}