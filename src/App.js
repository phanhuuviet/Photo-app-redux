import React, { Suspense, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SignIn from 'features/Auth/pages/SignIn';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect } from 'react';
import productApi from 'api/productApi';
import { useDispatch } from 'react-redux';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

// Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};
firebase.initializeApp(config);

function App() {
  
  // eslint-disable-next-line no-unused-vars
  const [ productList ,setProductList ] = useState([]);
  const dispatch = useDispatch();

  // Product List
  useEffect(() => {
    const fetchProductList = async () => {
      try {
      const params = {
        _page: 1,
        _limit: 10,
      }

      const response = await productApi.getAll(params);
      setProductList(response.data);
      } catch(error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, [setProductList])

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }
      const actionResult = await dispatch(getMe());
      const currentUser = unwrapResult(actionResult);
      console.log(currentUser);

      localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify(user.providerData))
    });

    return () => unregisterAuthObserver();
  }, [dispatch]);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;