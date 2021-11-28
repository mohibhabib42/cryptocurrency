import React,{useEffect} from "react"
import Home from "./Pages/LandingPage"
import Navigation from "./Pages/Navigation"
import AllCoins from "./Pages/AllCoins"
import Information from "./Pages/Information"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Navigation/>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={AllCoins} path="/AllCoins" />
          <Route component={Information} path="/Info" />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
