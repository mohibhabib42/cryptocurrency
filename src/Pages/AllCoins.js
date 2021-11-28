import React,{useEffect,useState,useRef} from 'react'
import {Table} from "react-bootstrap"
import {Link} from "react-router-dom"
function AllCoins() {

    const [Coins, setCoins] = useState([])
    const [Loading, setLoading] = useState(true)
    const [currency, setcurrency] = useState('EUR')
    const [CurrencyLoad, setCurrencyLoad] = useState(true)

    useEffect(() => {
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert='+currency,
            {
                method: 'GET',
                headers: new Headers({
                'X-CMC_PRO_API_KEY': '2da5c859-0ad4-46de-b96d-1f24ef29f3f8'
                })
            }
            )
                .then(res=> res.json())
                .then((result)=>{
                    setCoins(result.data)
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
                <h1>Loading..</h1>
            </div>
        )
    } 
    return (
        <div className="All-Coins">
            <h1>Top 100 Cryptocurrencies</h1>
        <div className="Coins-Table">
            <label htmlFor="Currency">Currency</label>
            <select onChange={ChangeHandler} id="currency" name="Currency">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
            </select>
            <hr/>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>7days Change</th>
                <th>24h Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
                Coins.map((item,i)=>{
                    return(
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{
                                CurrencyLoad
                                ? 'Loading' : item.quote[currency].price.toFixed(2) 
                                } {currency}
                            </td>
                            <td><span 
                                    id={CurrencyLoad
                                        ? '' : item.quote[currency].percent_change_24h>0 ? "Green" : "Red"
                                        }>
                                    {
                                    CurrencyLoad
                                    ? 'Loading' : item.quote[currency].percent_change_24h.toFixed(2) 
                                    }</span>
                            </td>
                            <td>
                                <span 
                                    id={CurrencyLoad
                                        ? '' : item.quote[currency].percent_change_7d>0 ? "Green" : "Red"
                                        }>
                                    {
                                    CurrencyLoad
                                    ? 'Loading' : item.quote[currency].percent_change_7d.toFixed(2) 
                                    }
                                </span>
                            </td>
                            <td>{
                                CurrencyLoad
                                ? 'Loading' : item.quote[currency].volume_24h.toFixed(0) 
                                } {currency}
                            </td>
                            <td>
                                <Link to={{pathname:'/Info',coin:{name:item.name,id:item.id}}}>More</Link>
                            </td>
                        </tr>
                    )
                })

            }
            </tbody>
          </Table>
        </div>
      </div>
    )
}

export default AllCoins
