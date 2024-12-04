import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ log }) => {
  let navigate = useNavigate();



  return (
    <div>
      <h2>Blood Sugar Log Entries</h2>
      <div>
      <table class="BSLTable" align="center" border="2"><tr><b><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TIME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mg/dL&nbsp;&nbsp;&nbsp;&nbsp;</u></b></tr>
        {log && log.map(entry => 
          <div key={entry.mgdl}>
            <tr><td><span>{entry.date}&nbsp;&nbsp;&nbsp;</span></td> 
            <td><span>{entry.time}&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
            <td><span>{entry.mgdl}</span></td></tr>
          </div>)}</table>
      </div>
      <div>
        <button onClick={() => navigate('/')}>Return Home</button> 
      </div>
    </div>
  )
  
}

export default Login;