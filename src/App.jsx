import { useState, useEffect } from 'react'


function App() {
  const [currencies, setCurrencies] = useState([])
  const convertCurrency = async () => {
    try {
      const amount = document.querySelector("#fromAmount").value;
      const fromCurrency = document.querySelector("#fromCurrency").value;
      const toCurrency = document.querySelector("#toCurrency").value;

      if (!amount || !fromCurrency || !toCurrency) {
        alert("Please fill all fields");
        return;
      }

      const response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UlrmRAIgTHVionNnspzaxScKH9OQ4QZyB60Mw5u6&currencies=AUD%2CBGN%2CBRL%2CCAD%2CCHF%2CCNY%2CCZK%2CDKK%2CEUR%2CGBP%2CHKD%2CHRK%2CHUF%2CIDR%2CILS%2CINR%2CISK%2CJPY%2CKRW%2CMXN%2CMYR%2CNOK%2CNZD%2CPHP%2CPLN%2CRON%2CRUB%2CSEK%2CSGD%2CTHB%2CTRY%2CUSD%2CZAR&base_currency=${currencies}`
      );
      const data = await response.json();
      const rate = data.data[toCurrency];
      const convertedAmount = amount * rate;

      document.querySelector("#toAmount").value = convertedAmount.toFixed(2);
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };


  const fetchdata = async () => {
    try {
      const response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UlrmRAIgTHVionNnspzaxScKH9OQ4QZyB60Mw5u6&currencies=AUD%2CBGN%2CBRL%2CCAD%2CCHF%2CCNY%2CCZK%2CDKK%2CEUR%2CGBP%2CHKD%2CHRK%2CHUF%2CIDR%2CILS%2CINR%2CISK%2CJPY%2CKRW%2CMXN%2CMYR%2CNOK%2CNZD%2CPHP%2CPLN%2CRON%2CRUB%2CSEK%2CSGD%2CTHB%2CTRY%2CUSD%2CZAR&base_currency=INR`
      );
      const data = await response.json();
      const fetchedCurrencies = Object.keys(data.data); // Extracting currency codes
      setCurrencies(fetchedCurrencies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(currencies)
  };

  // useEffect to call the fetch function
  useEffect(() => {
    fetchdata();
  }, []);



  return (
    <div className="h-screen bg-cover bg-center flex flex-wrap items-center justify-center" style={{ backgroundImage: "url('/easy.jpg')" }}>
      <div className="co2 backdrop-blur-sm bg-white/30 rounded-lg bg-red p-7 ">
        <div className='bg-white p-3 text-xl rounded-lg my-4'>
          <div>
            <label htmlFor="">From</label>
            <label htmlFor="" className='float-end'>Currency Type</label>
          </div>
          <div className=' px-1'>
            <input type="number" name="" id="" placeholder='Input' />
            <select name="" id="currency" className='rounded-md bg-gray-300 my-2'><option value="">--Choose a Currency--</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <button className=" absolute right-40 bottom-40 text-xl font-bold bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">SWAP
        </button> */}
        <div className='bg-white p-3 text-xl rounded-lg my-2'>
          <div>
            <label htmlFor="">To</label>
            <label htmlFor="" className='float-end'>Currency Type</label>
          </div>
          <div className='  px-1'>
            <input type="number" name="" readOnly id="" placeholder='Output' />
            <select name="" id="currency" className='rounded-md bg-gray-300 my-2'><option value="">USD</option>

            </select>
          </div>
        </div>
        <button
          className="bg-blue-400 font-serif text-2xl text-white rounded-xl px-10 w-full"
          onClick={convertCurrency}
        >
          Convert
        </button>

      </div>
    </div>
  )
}

export default App
