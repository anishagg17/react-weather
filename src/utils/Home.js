import React from 'react'
import request from 'request'
// import Map from './Map'
import { css } from '@emotion/core'
import { PacmanLoader } from 'react-spinners'

const override = css`
    // padding: 30px;
    border-color: red;
`
const Api_Key = '946d35d566e27385156baad2b0536fa2'
class Home extends React.Component {
    state = {
        ccity: '',
        ccountry: '',
        country: '',
        city: '',
        error: false,
        info: {},
        loading: false,
    }

    cb = (err, data) => {
        if (err) {
            return this.setState({
                error: err,
                info: data,
                loading: false,
            })
        }
        let obj = {}
        obj['Temperature'] = data.main.temp + '°C'
        obj['Humidity'] = data.main.humidity
        obj['Description'] = data.weather[0].description
        console.log('from cb', obj)
        return this.setState({ loading: false, info: obj, error: false })
    }

    formSubmit = e => {
        e.preventDefault()
        console.log = function() {}
        this.setState({
            loading: true,
            city: this.state.ccity,
            country: this.state.ccountry,
        })

        const city = this.state.ccity
        const country = this.state.ccountry
        console.log(city)
        // const url =
        //     'https://api.openweathermap.org/data/2.5/weather?q=nahan,in&APPID=946d35d566e27385156baad2b0536fa2&units=metric'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${Api_Key}&units=metric`
        // fetch(url).then(res => console.log(res))
        request({ url, json: true }, (error, response) => {
            console.log('using req', response)
            if (error) {
                return this.cb(error, {})
            } else if (response.body.message !== undefined) {
                return this.cb(response.body.message, {})
            }
            this.cb(false, response.body)
        })
    }

    render() {
        let response = this.state.error
        if (this.state.info !== {} && !this.state.error) {
            const { info } = this.state
            response = ''
            let arr = []
            for (let key in info) {
                arr.push(key)
            }
            response = arr.map(key => (
                <div>
                    <span>{key}</span> : {info[key]}
                </div>
            ))
            // console.log(arr)
        }
        if (this.state.loading) {
            response = (
                <PacmanLoader
                    css={override}
                    size={90} // or 150px
                    color={'#00ddff'}
                />
            )
        }
        return (
            <div className="main">
                <div className="f0">Weather App</div>
                <div className="f1">
                    <p className="frm"></p>
                    <form onSubmit={e => this.formSubmit(e)}>
                        <input
                            className="in"
                            placeholder="City"
                            onChange={e =>
                                this.setState({ ccity: e.target.value })
                            }
                        />
                        <input
                            className="in"
                            placeholder="Country"
                            onChange={e =>
                                this.setState({ ccountry: e.target.value })
                            }
                        />
                        <button className="btn">Get Weather</button>
                    </form>

                    <div className="res">{response}</div>
                </div>
            </div>
        )
    }
}
export default Home
