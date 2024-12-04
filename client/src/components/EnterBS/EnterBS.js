import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnterBS = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    date: '',
    time: '',
    mgdl: '',
  });

  const [errorData, setErrorData] = useState({ errors: null });
  
  const { date, time, mgdl } = userData;
  const { errors } = errorData;

  const onChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const enterBloodSugar = async() => {

      const newBSLEntry = {
        date: date,
        time: time,
        mgdl: mgdl
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const body = JSON.stringify(newBSLEntry);

        const res = await axios.post('http://localhost:5000/api/bslentry', body, config);
        
        // Store data and redirect
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } catch (error) {
        // Clear user data and set errors
        localStorage.removeItem('token');
        
        setErrorData({
          ...errors,
          errors: error.response.data.errors
        })
      }

      //getLog();
  }

  return (
    <div>
      <h2>Enter Blood Sugar</h2>
      <div>
        <input
          type='text'
          placeholder='Date'
          name='date'
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Time'
          name='time'
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Blood Sugar'
          name='mgdl'
          onChange={e => onChange(e)}
        />
      </div>
   <div>
        <button onClick={() => enterBloodSugar()}>Enter Blood Sugar</button>
      </div>
      <div>
        {errors && errors.map(error => 
          <div key={error.msg}>{error.msg}</div>)}
      </div>
    </div>
  )
}

export default EnterBS