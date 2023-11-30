
import axios from 'axios'

// Get the named env var, and assign it to the value variable
const compVisKey =
    process.env.COMPUTER_VISION_KEY;
const analyzeImage = async (imageUrl) => {
  const endpoint = 'https://imagproc.cognitiveservices.azure.com/';
  const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'es'
  };
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': compVisKey
  };

  try {
    const response = await axios.post(endpoint, { url: imageUrl }, { params, headers });
    return response.data;
  } catch (error) {
    console.error(`Error in Azure Image Analysis: ${error}`);
    throw error;
  }
};

export default analyzeImage;
