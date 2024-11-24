import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    data: null,
    data1: null
  }

  componentDidMount() {
    axios.get('http://localhost:5000')
      .then((response) => {
        this.setState({
          data: response.data,
          data1: response.statusText
        })
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`)
      })
  }

  render() {
    return (
      
        <>
        <header className="App-header">
          D.J. Larry Love . . . Coming to you On The Wheels of Steel!<br></br>
          Try and test THAT . . . You're GONNA GET SERVED!
        </header>
         <div className="App-choices1">
         <br></br>
         <br></br>
         <br></br>
         <p> </p>
         {'                                                                                '} {this.state.data} {'-> Response = '}  {this.state.data1}
            <ul>
              <li>DJ Services</li>
              <li>Karaoke Services</li>
              <li>Special Lighting & Effects</li>
              <li>Games & Trivia</li>
            </ul>
        </div>
        </>
       
       
   );
  }
}

export default App;