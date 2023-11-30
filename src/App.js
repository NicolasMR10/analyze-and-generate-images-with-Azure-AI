import React, { useState } from 'react';
import analyzeImage from './modules/azure-image-analysis';


function App() {
//Create a title variable and assign it a string value of "DescripImage: Transform Your Ideas into Visual Masterpieces"
  const title = 'DescripImagen: Transform Your Ideas into Visual Masterpieces';
//Create a text box that says "Input URL address here"
  const [imageUrl, setImageUrl] = useState(''); // Estado para la URL de la imagen
  const [analysis, setAnalysis] = useState(null); // Estado para la respuesta de la API
  const handletextBox = (event) =>{
    setImageUrl(event.target.value);
  };
//Create a button that says "Analize"
  const button1onClick = async() => {
    const response = await analyzeImage(imageUrl);
    setAnalysis(response); // Actualiza el estado con la respuesta de la API
  };
//Create a button that says "Generate"
  const button2onClick = () => {
    console.log('Analize2');
  };

  //analizeImage(importedUrl);
  return (
 
//Hacer que los botones queden abajo de textbox
   <div className="App"> 
    <h1>{title}</h1>
    <h4>Insert URL or type prompt</h4>
    <input type="text" onChange={handletextBox} placeholder="Input URL address here" />
      <div id="buttons">
        <button onClick={button1onClick}>Analize</button>
        <button onClick={button2onClick}>Generate</button>
      </div>
      <div id="New Image">
       {imageUrl && <img src={imageUrl} alt="Analyzed" style={{ width: '300px' }} />} {/* Muestra la imagen */}
      </div>
      <div id="Response1" style={{ border: '1px solid black', padding: '100px', width: '500px' }}>
       {analysis && <pre>{JSON.stringify(analysis, null, 2)}</pre>} {/* Muestra la respuesta JSON */}
      </div>
  </div>    
  );
}

export default App;