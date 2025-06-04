import React from 'react';
import CurationSystem from './components/CurationSystem'
import Introduction from './components/Introduction'
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
  <>
  <Router>
      <Routes>
        <Route path='/' element={<Introduction/>} />
        <Route path='/rice-trait-ontology' element={<CurationSystem/>} />
      </Routes>
    </Router>
  </>
    
  )
}
export default App;