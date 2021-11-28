import React,{useEffect,useRef,useState} from 'react'
import {Link} from "react-router-dom"


function LandingPage() {
        const [TopCoins, setTopCoins] = useState([])
        const [Loading, setLoading] = useState(true)
        const [currency, setcurrency] = useState('EUR')
        const [CurrencyLoad, setCurrencyLoad] = useState(true)

        useEffect(() => {
            fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=4&convert='+currency,
            {
                method: 'GET',
                headers: new Headers({
                'X-CMC_PRO_API_KEY': '2da5c859-0ad4-46de-b96d-1f24ef29f3f8'
                })
            }
            )
                .then(res=> res.json())
                .then((result)=>{
                    setTopCoins(result.data);
                }).then(()=>{                    
                    setLoading(false);
                    setCurrencyLoad(false)
                });
        }, [currency])

        const ChangeHandler=(e)=>{
            setCurrencyLoad(true)
            setcurrency(e.target.value)
        }

    if(Loading) {
        return (
            <div className="Loading">
                <h1>Loading...</h1>
            </div>
        )
    }       
    return (
        <div className="landing">
            <div className="Intro">
                <h5>
                    The Best Cryptocurrency Data 
                    Brought To Your Finger Tips.
                </h5>
                <Link to="/AllCoins">
                    <button>
                        ALL COINS
                    </button>
                </Link>
            </div>
            <div className="top-header">
                <h1>Top Coins 2021</h1>
                <label htmlFor="Currency">Currency </label>
                <select onChange={ChangeHandler} id="currency" name="Currency">
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                </select>
                <hr/>
            <div className="top-container">
                {
                    TopCoins.map((item,i)=>{
                        return(
                            <div key={i} className="Coin">
                                <h1>{item.name}</h1>
                                <p>{
                                    CurrencyLoad
                                    ? 'Loading' : item.quote[currency].price.toFixed(2) 
                                    } {currency}
                                </p>
                                <Link to={{pathname:'/Info',coin:{name:item.name,id:item.id}}}>
                                    <button>
                                        More Info
                                    </button>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </div>
    )
}

export default LandingPage
