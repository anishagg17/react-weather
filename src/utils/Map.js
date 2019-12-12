import React from 'react';

class Map extends React.Component {
    render() {
        const { address } = this.props;
        const link =
            'https://maps.google.com/maps?q=' +
            address +
            '&t=&z=13&ie=UTF8&iwloc=&output=embed';
        return (
            <div className="map">
                <iframe
                    title="none"
                    width="504"
                    height="333"
                    id="gmap_canvas"
                    src={link}
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                ></iframe>
            </div>
        );
    }
}

export default Map;
