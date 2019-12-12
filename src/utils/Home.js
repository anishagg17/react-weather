import React from 'react';
import request from 'request';
import Map from './Map';

class Home extends React.Component {
    state = {
        address: '',
        location: '',
        error: false,
        cords: undefined,
        info: '',
    };
    cb1 = (err, info) => {
        this.setState({
            error: err,
            info,
        });

        // console.log('from cb1', this.state);
    };

    cb = (err, data) => {
        this.setState({
            error: err,
            cords: data,
        });
        // console.log('from cb', this.state);

        const { cords } = this.state;

        let url =
            'https://api.darksky.net/forecast/f26d9d1d46d01cbe44919202ad81ff0b/' +
            cords[0] +
            ',' +
            cords[1];
        console.log(url);

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
                this.cb1(
                    false,
                    'Temperature : ' +
                        data.currently.temperature +
                        '°F Chances of raining: ' +
                        data.currently.precipProbability +
                        '%'
                );
            })
            .catch(err => this.cb1(err.message, ''));
    };

    nameChange = e => {
        this.setState({ address: e.target.value });
    };

    formSubmit = e => {
        e.preventDefault();
        const { address } = this.state;
        this.setState({ location: address });
        let url =
            'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            address +
            '.json?limit=2&access_token=pk.eyJ1IjoidGVzdGVyMXczMSIsImEiOiJjazN3MGN2aWYwcnF4M21vMTRqOXlmczVxIn0.czNWc2Swb6MlT85pW62eEA';

        request({ url, json: true }, (error, response) => {
            if (error) {
                return this.cb(error, undefined);
            } else if (response.body.features.length === 0) {
                return this.cb('Please enter valid location', undefined);
            }
            this.cb(false, response.body.features[0].center);
        });
    };

    render() {
        let response = <h3>{this.state.error}</h3>;
        if (!this.state.error) {
            response = (
                <div>
                    <Map address={this.state.location} />
                    <h3>{this.state.location}</h3>
                    <h3>{this.state.info}</h3>
                </div>
            );
        }
        return (
            <React.Fragment>
                <h1>Home</h1>
                <form onSubmit={e => this.formSubmit(e)}>
                    <input
                        name="address"
                        className="in"
                        onChange={e => this.nameChange(e)}
                    />
                    <button className="btn">Find</button>
                </form>
                {this.state.cords && response}
            </React.Fragment>
        );
    }
}
export default Home;
