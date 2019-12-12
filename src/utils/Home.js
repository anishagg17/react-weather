import React from 'react'
import request from 'request'
import Map from './Map'
import { css } from '@emotion/core'
import { PacmanLoader } from 'react-spinners'

const override = css`
    // padding: 30px;
    border-color: red;
`

class Home extends React.Component {
    state = {
        address: '',
        location: '',
        error: false,
        cords: undefined,
        info: '',
        loading: false,
    }
    cb1 = (err, info) => {
        this.setState({
            error: err,
            info,
            loading: false,
        })

        // console.log('from cb1', this.state);
    }

    cb = (err, data) => {
        this.setState({
            error: err,
            cords: data,
        })
        console.log('from cb', this.state)
        if (data === null) {
            this.setState({ loading: false })
            return
        }
        const { cords } = this.state

        let url =
            'https://api.darksky.net/forecast/f26d9d1d46d01cbe44919202ad81ff0b/' +
            cords[0] +
            ',' +
            cords[1]
        console.log(url)

        fetch(
            'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/38,-122',
            {
                credentials: 'omit',
                referrerPolicy: 'no-referrer-when-downgrade',
                body: null,
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.cb1(
                    false,
                    'Temperature : ' +
                        data.currently.temperature +
                        '°F Chances of raining: ' +
                        data.currently.precipProbability +
                        '%'
                )
            })
            .catch(err => this.cb1(err.message, ''))
    }

    nameChange = e => {
        this.setState({ address: e.target.value })
    }

    formSubmit = e => {
        e.preventDefault()

        this.setState({ loading: true })
        const { address } = this.state
        this.setState({ location: address })
        let url =
            'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            address +
            '.json?limit=2&access_token=pk.eyJ1IjoidGVzdGVyMXczMSIsImEiOiJjazN3MGN2aWYwcnF4M21vMTRqOXlmczVxIn0.czNWc2Swb6MlT85pW62eEA'

        request({ url, json: true }, (error, response) => {
            console.log(response)
            if (error) {
                return this.cb(error, null)
            } else if (response.body.features === undefined) {
                return this.cb('Please enter valid location', null)
            }
            this.cb(false, response.body.features[0].center)
        })
    }

    render() {
        let response = <div className="res">{this.state.error}</div>
        if (this.state.cords && this.state.error === false) {
            response = (
                <div className="res">
                    <Map address={this.state.location} />
                    <div>{this.state.location}</div>
                    <div>{this.state.info}</div>
                </div>
            )
        }
        if (this.state.loading) {
            response = (
                <div className="res">
                    <PacmanLoader
                        css={override}
                        size={90} // or 150px
                        color={'#00ddff'}
                    />
                </div>
            )
        }
        return (
            <React.Fragment>
                <h1>Home</h1>
                <form onSubmit={e => this.formSubmit(e)}>
                    <input
                        // style={{autofocus:"true",}}
                        name="address"
                        className="in"
                        onChange={e => this.nameChange(e)}
                    />
                    <button className="btn">Find</button>
                </form>
                {response}
            </React.Fragment>
        )
    }
}
export default Home
