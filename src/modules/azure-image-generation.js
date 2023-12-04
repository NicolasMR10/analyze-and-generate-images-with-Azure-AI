//Crear código parecido a azure-image-analysis.js para generar imagen de desde una api pública de OpenAI.
import OpenAI from "openai";

const openAIKey = process.env.REACT_APP_OPENAI_KEY;

//const openAIEndpoint = "api.openai.com/v1/images/generations";

export async function generateImage(prompt) {
  const openai = new OpenAI({apiKey: openAIKey, dangerouslyAllowBrowser: true});

  try {
    const response = await openai.images.generate(
      {
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
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

export function isConfigured() {

  if (!openAIKey) {
    return {
      isConfigured: false,
      message: "La variable de entorno para la API de OpenAI no está configurada correctamente."
    };
  }
  return { isConfigured: true };
}