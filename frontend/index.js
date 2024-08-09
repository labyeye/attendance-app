import { AppRegistry } from 'react-native';
import App from './App'; // Adjust the import path if necessary
import { name as appName } from './app.json'; // Ensure this matches your app name

AppRegistry.registerComponent(appName, () => App);
