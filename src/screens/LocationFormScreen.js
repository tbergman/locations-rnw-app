import React from 'react';
import { Text, View, StyleSheet, Animated, Picker } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation, HeaderBackButton } from 'react-navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, ThemeProvider } from 'nachos-ui'
import Button from 'apsl-react-native-button'

import Actions from '../state/Actions';
import Layout from '../constants/Layout';
import * as categoriesSelectors from '../state/CategoriesReducer';

const locationSchema = Yup.object().shape({
  locationName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .required('Required'),
  locationAddress: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .required('Required'),
  // category: Yup.string()
  //   .required('Required'),
  // The latitude must be a number between -90 and 90 and the longitude between -180 and 180.
  // locationLat: Yup.number()
  //   .min(-90, 'Must be above -90')
  //   .max(90, 'Must be bellow 90')
  //   .required('Required')
  //   .typeError('Must be a number'),
  // locationLng: Yup.number()
  //   .min(-180, 'Must be above -180')
  //   .max(180, 'Must be bellow 180')
  //   .required('Required')
  //   .typeError('Must be a number')
});

class LocationFormScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  _renderNavigationBar() {
    const { navigation } = this.props;
    const actionType = navigation.getParam('type', '');

    return (
      <Animated.View style={[styles.navigationBar]}>
        <View style={[styles.navigationBarAction, { marginLeft: -5 }]}>
          <HeaderBackButton
            onPress={() => this.props.navigation.goBack()}
            tintColor={'blue'}
            title={null}
          />
        </View>
        <View style={styles.navigationBarTitle}>
          <Text>{actionType === 'add' ? 'Add' : 'Edit'}</Text>
        </View>
      </Animated.View>
    );
  }

  handleSubmit = (values) => {
    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude', '');
    const longitude = navigation.getParam('longitude', '');
    let locationId = this.props.navigation.getParam('itemId', undefined)

    let location = {}
    location = {id: locationId, name: values.locationName, address: values.locationAddress, 
      latitude, longitude, category: values.category }

    this.props.dispatch(Actions.setLocation(location))
    this.props.navigation.navigate('locations')
  };
  _pickCoordinates = () => {
    this.props.navigation.navigate('Map')
  }

  render() {
    const { navigation, locations, categoriesNamesArray } = this.props;
    const actionType = navigation.getParam('type', '');
    const locationId = navigation.getParam('itemId', undefined);

    const updateLatLngFromMap = navigation.getParam('updateLatLngFromMap', false);
    const latitude = navigation.getParam('latitude', '');
    const longitude = navigation.getParam('longitude', '');
    let categoriesNamesArrTitle = 'Select a Category...'
    let categoriesNamesArrWithTitle = [categoriesNamesArrTitle, ...categoriesNamesArray]

    let initialNameValue = actionType === 'edit' ? locations[locationId].name : ''
    let initialAddressValue = actionType === 'edit' ? locations[locationId].address : ''
    let initialLatValue = updateLatLngFromMap === true ? latitude : 
                          actionType === 'edit' ? locations[locationId].latitude : ''
    let initialLngValue = updateLatLngFromMap === true ? longitude :
                          actionType === 'edit' ? locations[locationId].longitude : ''
    let initialCategoryValue = actionType === 'edit' ? locations[locationId].category : undefined

    return (
      <ThemeProvider>
      <View style={styles.container}>
        <Formik 
          // enableReinitialize
          initialValues={{ 
            locationName: initialNameValue, 
            locationAddress: initialAddressValue,
            // locationLat: updateLatLngFromMap === true ? latitude : '',
            // locationLng: updateLatLngFromMap === true ? longitude : '',
            category: initialCategoryValue,
          }}
          validationSchema={locationSchema}
          onSubmit={this.handleSubmit}
        >

          {({ errors, touched, handleChange, handleSubmit, isSubmitting, handleBlur, values, props }) => (

            <View>
              <Input
                style={styles.inputStyle}
                placeholder='Name'
                onChangeText={handleChange('locationName')}
                onBlur={handleBlur('locationName')}
                value={values.locationName}
              />
              {errors.locationName && touched.locationName ? (
                <View><Text style={styles.errorStyle}>{errors.locationName}</Text></View>
              ) : null}
              <Input
                style={styles.inputStyle}
                placeholder='Address'
                value={values.locationAddress}
                onChangeText={handleChange('locationAddress')}
                onBlur={handleBlur('locationAddress')}
              />
              {errors.locationAddress && touched.locationAddress ? (
                <View><Text style={styles.errorStyle}>{errors.locationAddress}</Text></View>
              ) : null}
  
              {
                // <Input
                //   // style={styles.inputStyle}
                //   placeholder='Latitude'
                //   value={values.locationLat}
                //   onChangeText={handleChange('locationLat')}
                //   onBlur={handleBlur('locationLat')}
                //   // onChangeText={value => this.setState({ value })}
                // />
                // {errors.locationLat && touched.locationLat ? (
                //   <View><Text style={styles.errorStyle}>{errors.locationLat}</Text></View>
                // ) : null}
                // <Input
                //   // style={styles.inputStyle}
                //   placeholder='longitude'
                //   value={values.locationLng}
                //   onChangeText={handleChange('locationLng')}
                //   onBlur={handleBlur('locationLng')}
                //   // onChangeText={value => this.setState({ value })}
                // />
                // {errors.locationLng && touched.locationLng ? (
                //   <View><Text style={styles.errorStyle}>{errors.locationLng}</Text></View>
                // ) : null}
              }

              <Button
                  style={styles.button}
                  textStyle={styles.btnText}
                  onPress={this._pickCoordinates}
                >
                Pick Coordinates from Map
              </Button>
              { initialLatValue !== '' &&
                (<View style={{ marginVertical: 5, color: '#424242'}}>
                    <Text>{`Latitude: ${initialLatValue}`}</Text>
                    <Text>{`Longitude: ${initialLngValue}`}</Text>
                  </View>)
              }

              <Picker
                style={{ marginVertical: 5}}
                name="category"
                selectedValue={values.category}
                onValueChange={handleChange('category')}
              >
              {categoriesNamesArrWithTitle.map((item, index) => {
                  return (<Picker.Item label={item} value={item} key={index + 1}/>) 
              })}
              </Picker>
              <Button
                onPress={handleSubmit} 
                isDisabled={isSubmitting} 
                style={styles.button}
                textStyle={styles.btnTextBottom}
              >
                {actionType === 'add' ? 'Add' : 'Update'}
              </Button>
            </View>
          )}

        </Formik>

        {this._renderNavigationBar()}
      </View>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    locations: state.locations,
    categoriesNamesArray: categoriesSelectors.getSortedCategoriesNamesArray(state)
  }; 
}

export default compose(withNavigation, connect(mapStateToProps))(LocationFormScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight + 100, // EXPO
    paddingTop: 60,
    // backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  navigationBarTitleText: {
    color: '#fff',
    textAlign: 'center',
  },
  navigationBarAction: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  navigationBarTitle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 40,
  },
  navigationBarShadowContainer: {
    position: 'absolute',
    top: Layout.HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: 15,
    bottom: 0,
  },
  navigationBarShadow: {
    height: 15,
    width: Layout.window.width,
  },
  navigationBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Layout.HEADER_HEIGHT,
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 5,
    // backgroundColor: 'white'
  },
  inputStyle : {
    marginTop: 5,
    // margin: 15 
  },
  errorStyle : {
    color: 'red'
  },
  button: {
    color: '#424242',
    borderRadius: 0,
    padding: 5,
    borderColor: '#ededed',
    backgroundColor: '#ededed',
    marginTop: 5,
    marginBottom: 5,
  },
  btnText: {
    fontSize: 13,
  },
  btnTextBottom: {
    fontSize: 15,
  }
});