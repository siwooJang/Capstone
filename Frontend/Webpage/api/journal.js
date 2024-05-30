// Mock implementation of the journal saving API
export const saveJournal = async (journal) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Journal saved:', journal);
        resolve({ success: true });
      }, 500);
    });
  };
  
  // import axiosInstance from './axiosInstance';

  // export const saveJournal = async (journal) => {
  //   try {
  //     const response = await axiosInstance.post('/diary/', journal);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error saving journal:', error);
  //     throw error;
  //   }
  // };
  