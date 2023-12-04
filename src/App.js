import React, { useState, useEffect } from 'react';
import {analyzeImage, isConfigured as VerAzu} from './modules/azure-image-analysis';
import {generateImage, isConfigured as VerOpen} from './modules/azure-image-generation';

// Custom hook for configuration
const useConfiguration = () => {
  const [configError, setConfigError] = useState(null);

  useEffect(() => {
    const azureConfig = VerAzu();
    const openAIConfig = VerOpen();

    if (!azureConfig.isConfigured) {
      setConfigError(azureConfig.message);
    } else if (!openAIConfig.isConfigured) {
      setConfigError(openAIConfig.message);
    }
  }, []);

  return configError;
};

const ErrorComponent = ({ message }) => (
  <div>
    <h1>Error</h1>
    <p>{message}</p>
  </div>
);

function Response({ title, imageUrl, data }) {
  return (
    <div className="Response">
      <h2>{title}</h2>
      {imageUrl && <img src={imageUrl} alt="Generated" style={{ width: '300px' }} />}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
function App() {

  const configError = useConfiguration();
  const title = 'DescripImagen: Transform Your Ideas into Visual Masterpieces';
  const [imageUrl, setImageUrl] = useState(''); // Estado para la URL de la imagen
  const [analysis, setAnalysis] = useState(null); // Estado para la respuesta de la API
  const [prompt, setPrompt] = useState(''); // Estado para la respuesta de la API
  const [activeButton, setActiveButton] = useState(null); 
  
  const handletextBox = (event) =>{
    setImageUrl(event.target.value);
  };

//Create a button that says "Analize"
  const button1onClick = async() => {
    const response = await analyzeImage(imageUrl)
    setAnalysis(response); // Actualiza el estado con la respuesta de la API
    setActiveButton(1);
  };
//Create a button that says "Generate"
  const button2onClick = async() => {
    const response = await generateImage(imageUrl)
    setPrompt(response); // Actualiza el estado con la respuesta de la API
    setActiveButton(2);
  };

  if (configError) {
    return <ErrorComponent message={configError} />;
  } else {
    return (
      <div className="App"> 
        <h1>{title}</h1>
        <h4>Insert URL or type prompt</h4>
        <input type="text" onChange={handletextBox} placeholder="Input URL address here"/>
        <div id="buttons">
          <button onClick={button1onClick}>Analize</button>
          <button onClick={button2onClick}>Generate</button>
        </div>
        {activeButton === 1 && <Response title="Analize Image" imageUrl={imageUrl} data={analysis} />}
        {activeButton === 2 && <Response title="Generate Image" imageUrl={prompt?.[0]?.url} data={prompt} />}
      </div>
    );
  }
}
export default App;