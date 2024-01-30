import './App.css';
import React, { useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Barchart from './components/Barchart';
import Scatterplot from './components/Scatterplot';
import dataset from './datasets/breast_cancer_wisconsin_original_rp.json';

// function ExampleComponent() {
//   // Declare a state variable called "count" and initialize it to 0
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <h1>Outlier Ambiguity Measurement Demo</h1>
      <h3>description of tool and how to use</h3>
      <Container>
      <Row>
        <Col>
          <Barchart />
        </Col>
        <Col>
          <Scatterplot data={dataset}/>
        </Col>
      </Row>
    </Container>
    </div>
    
    
  );
}

export default App;
