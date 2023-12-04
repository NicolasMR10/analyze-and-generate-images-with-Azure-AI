import React, { useState, useEffect } from 'react';
import {analyzeImage, isConfigured as VerAzu} from './modules/azure-image-analysis';
import {generateImage, isConfigured as VerOpen} from './modules/azure-image-generation';


function App() {

//Create a title variable and assign it a string value of "DescripImage: Transform Your Ideas into Visual Masterpieces"
  const title = 'DescripImagen: Transform Your Ideas into Visual Masterpieces';
//Create a text box that says "Input URL address here"
  const [imageUrl, setImageUrl] = useState(''); // Estado para la URL de la imagen
  const [analysis, setAnalysis] = useState(null); // Estado para la respuesta de la API
  const [prompt, setPrompt] = useState(''); // Estado para la respuesta de la API
  const [activeButton, setActiveButton] = useState(null); 

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
    return <div>{configError}</div>;
  }

  return (
 
//Hacer que los botones queden abajo de textbox
   <div className="App"> 
    <h1>{title}</h1>
    <h4>Insert URL or type prompt</h4>
    <input type="text" onChange={handletextBox} placeholder="Input URL address here"/>
      <div id="buttons">
        <button onClick={button1onClick}>Analize</button>
        <button onClick={button2onClick}>Generate</button>
      </div>
      {activeButton === 1 && (
        <div id="Response1" style={{ border: '1px solid black', padding: '100px', width: '500px' }}>
          <h2>Analize Image</h2>
          {imageUrl && <img src={imageUrl} alt="Generated" style={{ width: '300px' }} />}
          {analysis && <pre>{JSON.stringify(analysis, null, 2)}</pre>}
        </div>
      )}
      {activeButton === 2 && (
        <div id="Response2" style={{ border: '1px solid black', padding: '100px', width: '500px' }}>
          <h2>Generate Image</h2>
          {prompt && <img src={prompt[0]['url']} alt="Generated" style={{ width: '300px' }} />}
          {prompt && <pre>{JSON.stringify(prompt, null, 2)}</pre>}
        </div>
      )}
  </div>    
  );
}

export default App;