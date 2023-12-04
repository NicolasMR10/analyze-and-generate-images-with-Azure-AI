import axios from 'axios';

const compVisKey = process.env.REACT_APP_VISION_KEY;
const compVisEndpoint = process.env.REACT_APP_VISION_END;

export async function analyzeImage(imageUrl) {
  const endpoint = `https://${compVisEndpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,caption`;
  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

if (!urlPattern.test(imageUrl)) {
  throw new Error("Por favor, ingresa una URL válida.");
}
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
}

export function isConfigured() {

  if (!compVisKey || !compVisEndpoint) {
    return {
      isConfigured: false,
      message: "Las variables de entorno para el servicio de Azure no están configuradas correctamente."
    };
  }

  return { isConfigured: true };
}
