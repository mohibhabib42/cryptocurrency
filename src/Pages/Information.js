import React,{useEffect,useState,useRef} from 'react'
import {Redirect} from "react-router-dom"

function Information(item) {
    const [Loading, setLoading] = useState(true)
    const [state, setstate] = useState({})
    const [location, setlocation] = useState(true)
    useEffect(() => {
        if(item.location.coin !== undefined ){
            fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id='+item.location.coin['id'],
            {
                method: 'GET',
                headers: new Headers({
                'X-CMC_PRO_API_KEY': '2da5c859-0ad4-46de-b96d-1f24ef29f3f8'
                })
            }
            )
                .then(res=> res.json())
                .then((result)=>{ 
                    setstate(result.data[item.location.coin['id']])
                }).then(()=>{
                    setLoading(false)
                })
        }else{
            setlocation(false)
        }
        
    }, [])


    if(!location){
        return <Redirect to="/"/>
    }
    if(Loading) {
        return (
            <div className="Loading">
                <h1>Loading...</h1>
            </div>
        )
    } 
    return (
        <div className="Information">
            <h1>Coin Overview</h1>
            <div className="info-container">
                <div className="info-detail">
                    <h1>
                        {state.name}<img src={state.logo} />
                    </h1>
                    <p>
                        {state.description}
                    </p>
                </div>
                <div className="info-Links">
                    <h2>Links</h2>
                    <a rel="noreferrer" target="_blank" href={state.urls.website[0]}>Website</a>
                    <a rel="noreferrer" target="_blank" href={state.urls.message_board[0]}>Message Board</a>
                    <a rel="noreferrer" target="_blank" href={state.urls.explorer[0]}>Explorer</a>
                    <a rel="noreferrer" target="_blank" href={state.urls.reddit[0]}>Reddit</a>
                    <a rel="noreferrer" target="_blank" href={state.urls.technical_doc[0]}>Techinal Doc</a>
                    <a rel="noreferrer" target="_blank" href={state.urls.source_code[0]}>Source Code</a>
                </div>
            </div>
        </div>
    )
}

export default Information
