import React from 'react';
import AppRouter from './components/Router';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LocationProvider } from '@reach/router';

export default function App() {
  return (
    <LocationProvider>
      <Provider store={store}>
        <PersistGate loading={<div>Loading</div>} persistor={persistor}>
          <>
            <AppRouter></AppRouter>
          </>
        </PersistGate>
      </Provider>
    </LocationProvider>
  );
}
