import { useState, useEffect } from 'react';

function App() {
    const [currencies, setCurrencies] = useState([]); 
    const [fromCurrency, setFromCurrency] = useState(''); 
    const [toCurrency, setToCurrency] = useState('USD'); 
    const [amount, setAmount] = useState(''); 
    const [convertedAmount, setConvertedAmount] = useState(''); 
    const [error, setError] = useState(null); 

    
    const fetchdata = async () => {
        try {
            const response = await fetch(
                `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UlrmRAIgTHVionNnspzaxScKH9OQ4QZyB60Mw5u6`
            );
            const data = await response.json();
            const fetchedCurrencies = Object.keys(data.data); // Extract currency codes
            setCurrencies(fetchedCurrencies);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load currencies. Please try again later.');
        }
    };

    // Function to convert currency
    const convertCurrency = async () => {
        if (!amount || !fromCurrency || !toCurrency) {
            alert('Please fill in all fields.');
            return;
        }
        try {
            const response = await fetch(
                `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UlrmRAIgTHVionNnspzaxScKH9OQ4QZyB60Mw5u6&currencies=${toCurrency}&base_currency=${fromCurrency}`
            );
            const data = await response.json();
            const rate = data.data[toCurrency];
            const result = amount * rate;
            setConvertedAmount(result.toFixed(2)); // Display result rounded to 2 decimals
        } catch (error) {
            console.error('Error during conversion:', error);
            setError('Conversion failed. Please try again.');
        }
    };
    const swap = ()=>{
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }
    
    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div
            className="h-screen bg-cover bg-center flex flex-wrap items-center justify-center"
            style={{ backgroundImage: "url('/easy.jpg')" }}
        >
            <div className="co2 backdrop-blur-sm bg-white/30 rounded-lg p-7">
                <h1 className="text-center text-4xl font-extrabold text-black  mb-5">
                    Currency Converter
                </h1>
                {error && (
                    <div className="text-red-500 text-center mb-3">
                        {error}
                    </div>
                )}
                
                <div className="bg-white p-3 text-xl rounded-lg my-4">
                    <div>
                        <label htmlFor="fromAmount">From</label>
                        <label htmlFor="fromCurrency" className="float-end">
                            Currency Type
                        </label>
                    </div>
                    <div className="px-1">
                        <input
                            type="number"
                            id="fromAmount"
                            placeholder="Input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="rounded-md w-full p-2 border border-gray-300 mb-2"
                        />
                        <select
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="rounded-md w-full bg-gray-300 p-2"
                        >
                            <option value="">--Choose a Currency--</option>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center my-4">
  <button
    onClick={swap}
    className="text-xl sm:text-2xl md:text-3xl font-bold bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
  >
    SWAP
  </button>
</div>


                <div className="bg-white p-3 text-xl rounded-lg my-2">
                    <div>
                        <label htmlFor="toAmount">To</label>
                        <label htmlFor="toCurrency" className="float-end">
                            Currency Type
                        </label>
                    </div>
                    <div className="px-1">
                        <input
                            type="text"
                            id="toAmount"
                            placeholder="Output"
                            value={convertedAmount}
                            readOnly
                            className="rounded-md w-full p-2 border border-gray-300 mb-2"
                        />
                        <select
                            id="toCurrency"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="rounded-md w-full bg-gray-300 p-2"
                        >
                            <option value="">--Choose a Currency--</option>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className="bg-blue-400 font-serif text-2xl text-white rounded-xl px-10 w-full mt-5 hover:bg-blue-500"
                    onClick={convertCurrency}
                >
                    Convert
                </button>
            </div>
        </div>
    );
}

export default App;
