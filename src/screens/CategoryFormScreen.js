import React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { compose } from 'redux';
import {
  connect,
} from 'react-redux';
import { withNavigation, HeaderBackButton } from 'react-navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, ThemeProvider } from 'nachos-ui'
import Button from 'apsl-react-native-button'

import Actions from '../state/Actions';
import Layout from '../constants/Layout';


const AddCategorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .required('Required'),
});

class CategoryFormScreen extends React.Component {
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
    let categoryId = this.props.navigation.getParam('itemId', undefined)

    let category = {}
    category = {id: categoryId, name: values.categoryName }

    this.props.dispatch(Actions.addCategory(category))
    this.props.navigation.navigate('categories') 

  };

  render() {
    const { navigation, categories } = this.props;
    const actionType = navigation.getParam('type', '');
    const categoryId = navigation.getParam('itemId', undefined);
    let initialValue = actionType === 'edit' ? categories[categoryId].name : ''

    return (
      <ThemeProvider>
        <View style={styles.container}>
          <Formik 
            initialValues={{ categoryName: initialValue }}
            validationSchema={AddCategorySchema}
            onSubmit={this.handleSubmit}
          >

            {({ errors, touched, handleChange, handleSubmit, isSubmitting, handleBlur, values }) => (
              <View>
                <Input
                  onChangeText={handleChange('categoryName')}
                  onBlur={handleBlur('categoryName')}
                  value={values.categoryName}
                  placeholder='Category'
                />
                {errors.categoryName && touched.categoryName ? (
                  <View><Text style={styles.errorStyle}>{errors.categoryName}</Text></View>
                ) : null}

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
  return { categories: state.categories }; 
}

export default compose(withNavigation, connect(mapStateToProps))(CategoryFormScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight + 100, // EXPO
    paddingTop: 90,
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
    justifyContent: 'center',
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