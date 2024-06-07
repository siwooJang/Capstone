import axios from 'axios';

const API_KEY = process.env.OPENAI_API_KEY;
const RETRY_DELAY_MS = 5000; // 5초 대기
const MAX_RETRIES = 3; // 최대 3회 재시도

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getChatGPTResponse = async ( conversationHistory, retries = 0) => {
  try {
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a friendly and empathetic assistant. Help the user reflect on their day and their emotions.' },
        ...conversationHistory,
      ],
    };

    // 요청 본문을 콘솔에 출력합니다.
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
      console.error('429 Too Many Requests. Retrying in 5 seconds...');
      await delay(RETRY_DELAY_MS);
      return getChatGPTResponse(message, conversationHistory, retries + 1);
    } else {
      console.error('Error fetching ChatGPT response:', error);
      throw error;
    }
  }
};
