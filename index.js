import { AppRegistry, LogBox } from 'react-native';
import App from './App';

// Suppress all yellow-box warnings
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent('main', () => App);