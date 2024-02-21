import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

function App() {
    const BASE_URL = "https://api.frankfurter.app/latest";
    const [currencyOptions, setCurrencyOptions] = useState([]);

    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();

    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState();

    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount, fromAmount;

    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    function hanldeFromAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }

    function hanldeToAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    useEffect(() => {
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setFromCurrency(data.base);
                setToCurrency(Object.keys(data.rates)[0]);
                setExchangeRate(data.rates[Object.keys(data.rates)[0]]);
            });
    }, []);

    useEffect(() => {
        if (
            fromCurrency != null &&
            toCurrency != null &&
            toCurrency != fromCurrency
        ) {
            fetch(`${BASE_URL}?from=${fromCurrency}&to=${toCurrency}`)
                .then((response) => response.json())
                .then((data) => {
                    setExchangeRate(data.rates[toCurrency]);
                });
        } else if (toCurrency == fromCurrency) {
            setExchangeRate(1);
        }
    }, [fromCurrency, toCurrency]);

    return (
        <>
            <h1>Convert</h1>
            <CurrencyRow
                amount={fromAmount}
                selectedCurrency={fromCurrency}
                currencyOptions={currencyOptions}
                onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                onChangeAmount={hanldeFromAmountChange}
            />
            <div className="equals">=</div>

            <CurrencyRow
                selectedCurrency={toCurrency}
                currencyOptions={currencyOptions}
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={hanldeToAmountChange}
            />
        </>
    );
}

export default App;
