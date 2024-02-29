import './App.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import Barchart from './components/Barchart';
import Scatterplot from './components/Scatterplot';
import Outlierplot from './components/Outlierplot'
import { select } from 'd3';



function App() {
  const datasetList = ['breast_cancer_wisconsin_original_rp','cardiovascular_study_isomap', 'coil20_densmap', 'crowdsourced_mapping_umap', 'dermatology_isomap'];
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [selectedDataName, setDataName] = useState(null);
  const algorithmList = ['LOF', 'HDBSCAN', 'INNE'];
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  var currDataset = datasetList[0];
  var currAlgorithm = algorithmList[1];
  
  // var image = require('./images/' + currAlgorithm + '_' + currDataset + '.png');
  
  
  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === 'application/json') {
	// 		const reader = new FileReader();
	// 		reader.onload = (e) => {
	// 			try {
	// 				const jsonContent = JSON.parse(e.target.result);
	// 				setSelectedDataset(jsonContent);
	// 			} catch (error) {
	// 				alert('Invalid JSON file');
	// 			}
	// 		};
	// 		reader.readAsText(file);
	// 	} else {
	// 		alert('Please upload a JSON file');
	// 	}
  // };

  const handleDatasetChange = (event) => {
    // console.log(selectedDataset);
    const data = require(`./datasets/${event.target.value}.json`);
    setSelectedDataset(data);
    setDataName(event.target.value);
    // document.getElementById('fileUpload').value = '';
    // console.log(selectedDataset);

    var currDataset = event.target.value;
    // var image = require('./images/' + currAlgorithm + '_' + currDataset+ '.png');
    // console.log(image);
    console.log(currDataset);
    console.log(currAlgorithm);
  
  };

  const handleAlgorithmChange = (event) => {
    // console.log(selectedAlgorithm);
    setSelectedAlgorithm(event.target.value);
    // console.log(event.target.value);
    // console.log(selectedAlgorithm);

    var currAlgorithm = event.target.value;
    // var image = require('./images/' + currAlgorithm + '_' + currDataset + '.png');
    // console.log(image);
    console.log(currDataset);
    console.log(currAlgorithm);
    // console.log(event.target.value);
  }


  useEffect(() => {
    // Fetch the first dataset from the first option in the dropdown
    const datasetName = datasetList[0];
    const data = require(`./datasets/${datasetName}`);
    setSelectedDataset(data);
    setDataName(datasetName);

    // Set the first algorithm from the dropdown
    setSelectedAlgorithm(algorithmList[0]);
    // console.log(datasetName);
    // console.log(selectedDataName);
    // console.log(selectedAlgorithm);
    // var image = require('./images/' + algorithmList[0] + '_' + datasetName + '.png');
  }, []);


  return (
    // console.log(selectedDataset),
    console.log(selectedAlgorithm),
    console.log(selectedDataName),

    <div className="App">
      
      <Container>
        <br/>
        <br/>
        <br/>
        <Row className="pr-5">
        <h1>Outlier Ambiguity Measurement Demo</h1>
        <br/>
        <h3>description of tool and how to use</h3>
        <br/>
        <br/>
        <br/>
        </Row>
          <Row >
            <Col>
            <h4>Input Scatterplot</h4>
              <div style={{ border: '1px solid black', display: 'inline-block', height:400, width:500}}>
                <Scatterplot data={selectedDataset} key={selectedDataset}/>
              </div>
              <br/>
              <Form style={{width:400, display: 'inline-block'}}>
                  <Form.Group controlId="dataSelect">
                    <Form.Label>Select from available datasets</Form.Label>
                    <Form.Select onChange={handleDatasetChange} >
                      {datasetList.map((dataset, index) => (
                        <option key={index} value={dataset}>
                          {dataset}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
                
            </Col>
            <Col>
              <h4>Output</h4>
              <div style={{ border: '1px solid black', display: 'inline-block', height:400, width:500}}>
                {/* <div id="tooltip" style={{position: 'absolute', visibility: 'hidden'}}></div> */}
                {/* <Outlierplot data={selectedDataset} algorithm={selectedAlgorithm} key={selectedDataset}/> */}
                {/* <img src={'./src/images/' + selectedAlgorithm + '_' + selectedDataset + '.png'}/> */}
                <img src={require('./images/' + selectedAlgorithm + '_' + selectedDataName + '.png')} alt='outlier' key={[selectedAlgorithm, selectedDataset]}/>
                {/* <img src={image} alt='outlier' key={[selectedAlgorithm, selectedDataset]}/> */}
              </div>
              <br/>
              <Form style={{width:400, display: 'inline-block'}}>
                  <Form.Group controlId="algSelect">
                    <Form.Label>Select Outlier Detection Algorithm</Form.Label>
                    <Form.Select onChange={handleAlgorithmChange} >
                      {algorithmList.map((algorithm, index) => (
                        <option key={index} value={algorithm}>
                          {algorithm}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
            </Col>
          </Row>
          <br/>
          <br/>
          <br/>

      
    </Container>
    </div>
  
  );
}

export default App;
