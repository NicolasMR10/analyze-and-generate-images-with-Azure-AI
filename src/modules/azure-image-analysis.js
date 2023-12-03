import axios from 'axios';

const compVisKey = '';
const compVisEndpoint = '';

const analyzeImage = async (imageUrl) => {
  const endpoint = `https://${compVisEndpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,caption`;

  try {
    const response = await axios.post(endpoint, { url: imageUrl }, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': compVisKey
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Response Code', error.response.status);
      console.error('Response Body', error.response.data);
    }
    throw error;
  }
};

export default analyzeImage;
