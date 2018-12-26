import React from 'react';
import {
  connect,
} from 'react-redux';

import LocationDetails from '../components/LocationDetails';

class LocationDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  render() {
    let locationId = this.props.navigation.state.params.locationId;
    let location = this.props.locations[locationId]

    return (
      <LocationDetails
        location={location}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return { 
    locations: state.locations,
  }; 
}


export default connect(mapStateToProps)(LocationDetailsScreen)
