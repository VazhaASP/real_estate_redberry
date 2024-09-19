import api from "../plugins/axios/index"

export const getAgents = async () => { return await api.get('/agents') }

export const createAgent = async (name, surname, email, phone, avatar) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('avatar', avatar); // Avatar file
  
      // Send POST request using multipart/form-data
      const response = await api.post('/agents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }
  };