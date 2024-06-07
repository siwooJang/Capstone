import axios from 'axios';

const API_KEY = process.env.OPENAI_API_KEY;
const RETRY_DELAY_MS = 5000; // 5초 대기
const MAX_RETRIES = 3; // 최대 3회 재시도

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getChatGPTResponse = async ( conversationHistory, retries = 0) => {
  try {
    console.log
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // 사용하려는 모델 버전을 지정합니다.
        messages: [
          { role: 'system', content: 'You are a friendly and empathetic assistant. Help the user reflect on their day and their emotions.' },
          ...conversationHistory,
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Response-Format': 'text' // 반환 형식 지정 
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
