import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import About from './utils/About'
import Home from './utils/Home'
import Navbar from './utils/Navbar'
import Error from './utils/Error'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Navbar />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route path="/">
                        <Error />
                    </Route>
                </Switch>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)
serviceWorker.unregister()
