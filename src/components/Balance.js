import React,{useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Balance = ({dataUrl, setDataUrl }) => {
    useEffect(() => {
        !dataUrl && navigate(`/`);
        console.log(dataUrl);
    
      }, [dataUrl]);

    let navigate = useNavigate();
    const [last, setLast] = useState('');
    const [message, setMessage] = useState('');

    let imgSrc;
    // let last.your_bmi = 0;

    if (last.your_bmi < 1) {
      imgSrc = null
    }else if (last.your_bmi === undefined){
        imgSrc = null
    } else {
      if(last.your_bmi < 25) {
        imgSrc = require('../assets/underweight.png')
      } else if (last.your_bmi >= 25 && last.your_bmi < 30) {
        imgSrc = require('../assets/healthy.png')
      } else {
        imgSrc = require('../assets/overweight.png')
      }
    }

    console.log(last.your_bmi)


    React.useEffect(() => {
        // if(dataUrl){
          axios.get(`https://${dataUrl}`).then((response) => {
            setLast(response.data);
          });
          if (last.your_bmi < 25) {
            setMessage('You were underweight')
          } else if (last.your_bmi === undefined){

          } else if (last.your_bmi >= 25 && last.your_bmi < 30) {
            setMessage('You are a healthy weight')
          } else {
            setMessage('You were overweight')
          }
          
      
        //   console.log(last);
        // }
        
      }, [dataUrl]);
  return (
    <div>
        <div className='container'>
    <h2 className='center'>BMI Calculator</h2>

    <div>
      <div className='center'>
      <h3>Your BMI is: {last.your_bmi}</h3>
      <p>{message}</p>
      </div>

    <div className='img-container'>
      <img src={imgSrc} alt=''></img>
    </div>
    <div>
      <h3>Date checked: {last.date}</h3>
    </div>
    </div>
    
    <div>
    <button className='btn' type='submit' onClick={() => setDataUrl(``)}>Back</button>
    </div>
  </div>
    </div>
  )
}

export default Balance;