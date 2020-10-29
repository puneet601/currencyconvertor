import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';
const BASE_URL = 'https://api.exchangeratesapi.io/latest'
function App(){
    const [currencyOptions,setCurrencyOptions]=useState([])
const [fromCurrency,setfromCurrency]=useState()
const [toCurrency,settoCurrency]=useState()
const [exchangeRate,setexchangeRate]=useState()
const [amount,setAmount] = useState(1)
const [amountInFromCurrency,setamountInFromCurrency]=useState(true)
let toAmonut,fromAmount
if(amountInFromCurrency){
    fromAmount = amount
    toAmonut = amount*exchangeRate
}   
else{
toAmonut = amount
fromAmount = amount/exchangeRate
}
useEffect(() => {
fetch(BASE_URL)
.then(res => res.json())
.then(data => {
    const firstCurrency=Object.keys(data.rates)[0]
    setCurrencyOptions([data.base,...Object.keys(data.rates)])
setfromCurrency(data.base)
settoCurrency(firstCurrency)
setexchangeRate(data.rates[firstCurrency])
}) 
    },[]);
    useEffect(() => {
        if(fromCurrency!= null && toCurrency!=null)
       { fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setexchangeRate(data.rates[toCurrency]))
      }  },[fromCurrency,toCurrency])
    function onFromAmountChange(e){
setAmount(e.target.value)
setamountInFromCurrency(true);
    }
    function onToAmountChange(e){
        setAmount(e.target.value)
        setamountInFromCurrency(false);
            }
    return (
        <>
        <h1>Convert</h1>
        <CurrencyRow  currencyOptions={currencyOptions}
         selectCurrency={fromCurrency}  
         onChangeCurrency={e => setfromCurrency(e.target.value)}
         onChangeAmount={onFromAmountChange}
         amount={fromAmount} />
       
        <div className="equals">=</div>
        <CurrencyRow currencyOptions={currencyOptions} 
        selectCurrency={toCurrency}     
        onChangeCurrency={e => settoCurrency(e.target.value)} 
        onChangeAmount={onToAmountChange}
        amount={toAmonut} />
        </>
    );
}
export default App;

