import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions';

import './App.css';

// components
import AuthRoute from './util/AuthRoute';
import AdminAuthRoute from './util/AdminAuthRoute';

// pages
import Home from './pages/Home';
import AddCoin from './pages/AddCoin';
import Coin from './pages/Coin';
import Promote from './pages/Promote';
import Newsletter from './pages/Newsletter';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Disclaimer from './pages/Disclaimer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Admin from './pages/Admin';

require('dotenv').config();
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL + '/api';

const token = localStorage.FBIdToken;
if (token) {
  const decoded_token = jwtDecode(token);
  if (decoded_token.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path="/coin" component={AddCoin} />
          <Route exact path="/coin/:id" component={Coin} />
          <Route exact path="/promote" component={Promote} />
          <Route exact path="/newsletter" component={Newsletter} />
          <Route exact path="/disclaimer" component={Disclaimer} />
          <Route exact path="/privacypolicy" component={PrivacyPolicy} />
          <Route exact path="/terms" component={Terms} />
          <AdminAuthRoute exact path="/admin" component={Admin} />
          {/* <Route exact path="/simple" component={Simple} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}