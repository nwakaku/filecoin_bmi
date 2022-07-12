import React, {useState, useEffect} from 'react';
import './App.css';
import Balance from './components/Balance';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// function getAccessToken () {
//   return eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyQmMzYmEyNEMwNzIyZUZkODg5NmIzOGQxYzI5ZWE0RUFiMjdiMjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTE1ODA4MDYxNTcsIm5hbWUiOiJoYWNrYXRob24ifQ.dUoB7ul5STVdpTnRb_fy-s6ihD6hNUJ2qDevhE2Kk0A
// }



function App() {

  // state

  const [bmi, setBmi] = useState('')
  const [hashes, setHashes] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  // const [truty, setTruty] = useState(true);



  // saving bmi





  // let calcBmi = (event) => {
  //     // Logic for message

      
  //   }

  return (
    <div className="app">
      <BrowserRouter>
    <Routes>
      <Route path="/" 
      element= {<Home 
        bmi={bmi} 
        setBmi={setBmi} 
        hashes={hashes} 
        setHashes={setHashes} 
        dataUrl={dataUrl} 
        setDataUrl={setDataUrl} />} />
      <Route path="balance" element={ <Balance dataUrl={dataUrl} setDataUrl={setDataUrl} />} />
      {/* <Route path="invoices" element={<Invoices />} /> */}
    </Routes>
  </BrowserRouter>
      
    </div>
  );
}

export default App;