import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
const URL='http://api.exchangeratesapi.io/v1/latest?access_key='
const API_KEY='911b3806a1cbe40dacf96b52c007b3f3'
function App() {
  const [yen,setYen]=useState(0)
  const [eur,setEur]=useState(0)
  const [rate,setRate]=useState(0)

  async function convert(e){
    e.preventDefault();
    try {
      const address=URL+API_KEY
      const response=await fetch(address)

      if(response.ok){
        const json=await response.json()
        console.log(json.rates.JPY)
        setRate(json.rates.JPY)

        setEur(yen/json.rates.JPY)
      }else {
        alert ('Error retrieving exchange rates')
        console.log(response)
      }
    }catch (err){
      alert(err)
    }
  }

  return (
  <div id='container'>
    <h1>JPY to EUR calculator</h1>
    <form onSubmit={convert}>
      <div>
        <label>JPY </label>&nbsp;
        <input type='number' step='0.01'
        value={yen} onChange={e=>setYen(e.target.value)} />
        <output>{rate}</output>
      </div>
      <div>
        <label>EUR </label>
        <output>{eur.toFixed(2)} €</output>
      </div>
      <div>
        <button>Calculate</button>
      </div>
    </form>
  </div>
  );
}

export default App;
