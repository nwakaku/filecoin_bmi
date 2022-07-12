import React,{useEffect, useState} from 'react';
import { Web3Storage } from 'web3.storage';
import { useNavigate } from "react-router-dom";


const client = new Web3Storage({
  token:
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyQmMzYmEyNEMwNzIyZUZkODg5NmIzOGQxYzI5ZWE0RUFiMjdiMjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTc1MzIwMzE5ODgsIm5hbWUiOiJibWkgY2FsY3VsYXRvciJ9.clr-Wn2D663cz_JvwiQWr7lL8Pl4RY8QPFZkFQzv0sQ"
})




const Home = ({bmi, setBmi,hashes, setHashes,dataUrl, setDataUrl }) => {
  let navigate = useNavigate();

  const [popUp, setPopUp] = useState(true);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [hashpop, setHashpop] = useState(true);

  useEffect(() => {
    dataUrl && navigate(`/balance`);
    console.log(dataUrl);

  }, [dataUrl]);
  




  //for external control
  async function saveToWeb() {
    if(bmi){
      setPopUp(!popUp)
      const jsontype = JSON.stringify({your_bmi:bmi, date: new Date()});
      console.log(jsontype);
      console.log({your_bmi:bmi, date: new Date()})
      const file = new File([jsontype], { type : 'application/json'});
      const onStoredChunk = (chunkSize) => 
        console.log(`stored chunk of ${chunkSize} bytes`);
        const cid = await client.put([file], { onStoredChunk });
        setHashes(cid);
  
    }else{
      alert('error')
    }
    
  }

  
  //retrieving from web3.storage
  async function retrieveFiles (cid) {
    console.log(cid)
    const res = await client.get(cid);
    const files = await res.files();
    for (const file of files){
      const url = `${file.cid}.ipfs.dweb.link`;
      setDataUrl(url);
      console.log(`${file.cid} ${file.name} ${file.size}`);
      console.log(url)
    }
    console.log(dataUrl);
    // <Navigate to="/balance" replace={true} />
  // setTruty(!truty);
}

  //controls
  let calcBmi = (event) => {
    //prevent submitting
    event.preventDefault()

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = (weight / (height * height) * 703)
      setBmi(bmi.toFixed(1))

      // Logic for message

      if (bmi < 25) {
        setMessage('You are underweight')
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are a healthy weight')
      } else {
        setMessage('You are overweight')
      }

      //something
      
    }
  }

  //  show image based on bmi calculation
  let imgSrc;

  if (bmi < 1) {
    imgSrc = null
  } else {
    if(bmi < 25) {
      imgSrc = require('../assets/underweight.png')
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = require('../assets/healthy.png')
    } else {
      imgSrc = require('../assets/overweight.png')
    }
  }
  // for your_bmi
  // if (last.your_bmi < 1) {
  //   imgSrc = null
  // } else {
  //   if(last.your_bmi < 25) {
  //     imgSrc = require('../src/assets/underweight.png')
  //   } else if (last.your_bmi >= 25 && last.your_bmi < 30) {
  //     imgSrc = require('../src/assets/healthy.png')
  //   } else {
  //     imgSrc = require('../src/assets/overweight.png')
  //   }
  // }


  let reload = () => {
    window.location.reload()
  }

  return (
    <div className='home_bmi'>
      {/* popup Ui */}
      <div className={ `${popUp ? 'popup' : 'popup active'}`} id="popup-1">
        <div className="overlay"></div>
        <div className="content">
          <div className="close-btn" onClick={() => {setPopUp(!popUp);setHashes('');reload()}}>
            &times;
          </div>
          <h1>Hash Phrase</h1>
          {hashes.length !== 0 ? 
          (<p> {hashes} </p>) : 
          (<p>Loading Please be patient</p>)}
          
        </div>
      </div>

      <div className={ `${hashpop ? 'popup' : 'popup active'}`} id="popup-1">
        <div className="overlay"></div>
        <div className="content">
          <div className="close-btn" onClick={() => {setHashpop(true)}}>
            &times;
          </div>
          <div>
          <h1>Hash Phrase</h1>
          <input value={hashes} onChange={(e) => setHashes(e.target.value)} />
          <button className='btn' onClick={() => {setHashpop(!hashpop);retrieveFiles(hashes)}} >Submit</button>
          </div>
          

          
        </div>
      </div>

      {/* Popout and popups */}
        <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
      <div className='divider'>

      <form onSubmit={calcBmi}>
        <div>
          <label>Weight (lbs)</label>
          <input value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div>
          <label>Height (in)</label>
          <input value={height} onChange={(event) => setHeight(event.target.value)} />
        </div>
        <div>
          <button className='btn' type='submit'>Check</button>
          {/* <button className='btn btn-outline' onClick={reload} >Reload</button> */}
        </div>
      </form>

      <div>
        <div className='center'>
        <h3>Your BMI is: {bmi}</h3>
        <p>{message}</p>
      </div>

      <div className='img-container'>
        <img src={imgSrc} alt=''></img>
      </div>
      </div>
      </div>
      

      
      
      <div>
      <button onClick={saveToWeb} className='btn' type='submit'>Save</button>
      <button onClick={() => setHashpop(!hashpop)} className='btn btn-outline' type='submit'>Check Previous</button>
      </div>
    </div>
    </div>
  )
}

export default Home