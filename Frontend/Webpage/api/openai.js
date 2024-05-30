// Mock implementation of the OpenAI API
export const getChatGPTResponse = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`This is a mock response to your message: "${message}"`);
      }, 500);
    });
  };

  // import axios from 'axios';

  // const API_KEY = 'your-openai-api-key-here';
  
  // export const getChatGPTResponse = async (message, conversationHistory = []) => {
  //   try {
  //     const response = await axios.post(
  //       'https://api.openai.com/v1/chat/completions',
  //       {
  //         model: 'gpt-3.5-turbo', // 사용하려는 모델 버전을 지정합니다.
  //         messages: [
  //           ...conversationHistory,
  //           { role: 'system', content: 'You are a friendly and empathetic assistant. Help the user reflect on their day and their emotions.' },
  //           { role: 'user', content: message }
  //         ],
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${API_KEY}`,
  //         },
  //       }
  //     );
  //     return response.data.choices[0].message.content;
  //   } catch (error) {
  //     console.error('Error fetching ChatGPT response:', error);
  //     throw error;
  //   }
  // };
  