import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainContainer } from './components/MainList/MainListReducer';
import { Actions, Router, Stack, Scene } from 'react-native-router-flux';
import Savings from './components/Savings/Savings';
import Cryptos from './components/Cryptos/Cryptos';
import Stocks from './components/Stocks/Stocks';
import Login from './components/Login/Login';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    let user = '';
  }

  async componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBDfOgSsKfFZHQDlDvlKbiLMCENwjqz3jU',
      authDomain: 'personal-finance123.firebaseapp.com',
      databaseURL: 'https://personal-finance123.firebaseio.com',
      projectId: 'personal-finance123',
      storageBucket: 'personal-finance123.appspot.com',
      messagingSenderId: '872553161990'
    };
    firebase.initializeApp(firebaseConfig);
    
    this.user = await firebase.auth().currentUser;
  }

  render() {
    return (
      <Provider store={store}>
        <Router sceneStyle={styles.header} >
          <Stack key='root'>
            <Scene key='login' component={Login} title='Login' />
            <Scene key='mainList' component={MainContainer} title='My list' />
            <Scene key='savings' component={Savings} />
            <Scene key='cryptos' component={Cryptos} />
            <Scene key='stocks' component={Stocks} />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});
