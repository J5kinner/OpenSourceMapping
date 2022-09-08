import React, {useState, useEffect} from 'react';
import {Button} from 'antd';
import './css/App.css';
import { OLMap } from './components/OLMap';

// function FileUploader() {
//   let htmlData;
//   const defaultFileType = "html";
//   let fileInput = React.createRef();
//   let fileInput2 = React.createRef();

//   const [selectFile, setFile] = useState({
//     fileType: defaultFileType,
//     fileDownloaderURL: null,
//     status: "",
//     newFileName: "",
//     data: "",
//   });


function App() {
  return (
    <div className="App">
      <header className="tool-header">
        <h1>
          Mapping Pro
        </h1>
        <Button type="primary" >Upload</Button>

  
      </header>
      <section className="work-section">

        <div className="split map-area">
         

        </div>
        <div className="split toolset">

        </div>
     

      </section>
    </div>
  );
}

export default App;
