import './App.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import Barchart from './components/Barchart';
import Scatterplot from './components/Scatterplot';


function App() {
  const datasetList = ['breast_cancer_wisconsin_original_rp.json','cardiovascular_study_isomap.json', 'coil20_densmap.json'];
  const [selectedDataset, setSelectedDataset] = useState(null);

  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const jsonContent = JSON.parse(e.target.result);
					setSelectedDataset(jsonContent);
				} catch (error) {
					alert('Invalid JSON file');
				}
			};
			reader.readAsText(file);
		} else {
			alert('Please upload a JSON file');
		}
  };

  const handleDatasetChange = (event) => {
    const data = require(`./datasets/${event.target.value}`);
    setSelectedDataset(data);
    document.getElementById('fileUpload').value = '';
  };


  useEffect(() => {
    // Fetch the first dataset from the first option in the dropdown
    const datasetName = datasetList[0];
    const data = require(`./datasets/${datasetName}`);
    setSelectedDataset(data);
  }, []);


  return (
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
              <br/>
              <br/>
              <Form style={{width:300, display:'inline-block'}}>
                  <Form.Group controlId="fileUpload" className="mb-3" >
                    <Form.Label>OR Upload a 2D array as a JSON file</Form.Label>
                    <Form.Control type="file" accept=".json" onChange={handleFileUpload}/>
                  </Form.Group>
                </Form>
                
            </Col>
            <Col>
              <h4>Output</h4>
              <div style={{ border: '1px solid black', display: 'inline-block', height:400, width:500}}>
              </div>
            </Col>
          </Row>
      
    </Container>
    </div>
  
  );
}

export default App;
