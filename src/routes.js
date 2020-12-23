import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/Main';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: ' Memory Game',
      },
    },
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#f5f5f5',
      headerStyle: {
        backgroundColor: '#282a36',
      },
    },
  }),
);

export default Routes;
