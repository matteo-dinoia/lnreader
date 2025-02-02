import 'react-native-gesture-handler';
import { enableFreeze } from 'react-native-screens';

enableFreeze(true);

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Main from './src/navigators/Main';

import { createDatabase } from './src/database/db';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import AppErrorBoundary from '@components/AppErrorBoundary/AppErrorBoundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    LottieSplashScreen.hide();
    createDatabase();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <PaperProvider>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Main />
              </PaperProvider>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </AppErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;
