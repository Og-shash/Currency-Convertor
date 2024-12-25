import { useState, useEffect } from 'react'


function App() {
  const fetchdata = async ()=>{
    let a = await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UlrmRAIgTHVionNnspzaxScKH9OQ4QZyB60Mw5u6")
    let data = await a.json();
    let z =data.data.AUD
    console.log(z)
    console.log(data);
  }

  useEffect(() => {
    fetchdata()
  }, [])
  
  return (
    <div>hi</div>
  )
}

export default App
