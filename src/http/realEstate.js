import api from "../plugins/axios/index"

export const getRealEstates = async () => { return await api.get('/real-estates') };

export const createRealEstate = async (
    address, 
    regionId, 
    description, 
    image, 
    cityId, 
    zipCode, 
    price, 
    area, 
    bedrooms, 
    isRental, 
    agentId
) => {
    try {
        const formData = new FormData();
        formData.append('address', address);
        formData.append('region_id', regionId);
        formData.append('description', description);
        formData.append('image', image); // Image file
        formData.append('city_id', cityId);
        formData.append('zip_code', zipCode);
        formData.append('price', price);
        formData.append('area', area);
        formData.append('bedrooms', bedrooms);
        formData.append('is_rental', isRental);
        formData.append('agent_id', agentId);
    
        // Send POST request using multipart/form-data
        const response = await api.post('/real-estates', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        return response.data;
      } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }
  };
