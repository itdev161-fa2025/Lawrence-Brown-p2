import React from 'react'
import './App.css';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import EnterBS from './components/EnterBS/EnterBS';
import DisplayBSLog from './components/DisplayBSLog/DisplayBSLog'

class App extends React.Component {
  state = {
    data: null,
    token: null,
    BSLog: null
  }

  componentDidMount() {
    axios.get('http://localhost:5000')
      .then((response) => {
        this.setState({
          data: response.data
        })
      })
      .catch((error) => {
        console.error(`Error fetching data ${error}`);
      })

      this.getLog();
  }

  getLog = () => {
    const token = localStorage.getItem('token');

    if(!token) {
      localStorage.removeItem('BSLog')
      this.setState({ user: null });
    }

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      }
      axios.get('http://localhost:5000/api/bslentries', config)
        .then((response) => {
          //localStorage.setItem('BSLog', response.data.name)
          this.setState({ BSLog: response.data })
        })
        .catch((error) => {
          //localStorage.removeItem('BSLog');
          this.setState({ BSLog: null });
          console.error(`Error logging in: ${error}`);
        })
    }
  }

  render() {
    let { user, data } = this.state;
    const authProps = {
      log: this.state.BSLog
    }

    return (
      <div className='App'> 
        <header className='App-header'>
          <h1>Blood Sugar Log</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/EnterBS">Blood Sugar Log Entry</Link></li>
            <li><Link to="/DisplayBSLog">Display Log</Link></li>
          </ul>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} data={data} />} />
            <Route path="/EnterBS" element={<EnterBS  />} />
            <Route path="/DisplayBSLog" element={<DisplayBSLog {...authProps} />} />
          </Routes>
        </main>
        
      </div>
    )
  }
}

export default App;