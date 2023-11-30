
import axios from 'axios'

// Get the named env var, and assign it to the value variable
const compVisKey =
    process.env.VISION_KEY;
const compVisEndpoint =
    process.env.VISION_END;
const analyzeImage = async (imageUrl) => {
  const endpoint = `https://${compVisEndpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,caption`;
  const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'es'
  };
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': compVisKey
  };
  console.log(compVisEndpoint);
  console.log(compVisEndpoint);
  try {
    const response = await axios.post(endpoint, { url: imageUrl }, { params, headers });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(`Error in Azure Image Analysis: ${error}`);
    throw error;
  }
};

export default analyzeImage;

