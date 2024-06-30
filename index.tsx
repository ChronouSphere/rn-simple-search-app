import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {MD3LightTheme, PaperProvider, configureFonts} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/redux/store';
import fontConfig from './font.config';

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig, isV3: true}),
};

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
