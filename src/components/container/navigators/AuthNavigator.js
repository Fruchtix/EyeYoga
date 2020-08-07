import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RegisterAccount from '../../screens/registration/RegisterAccount'
import RegisterName from '../../screens/registration/RegisterName'
import RegisterPassword from '../../screens/registration/RegisterPassword'

import StartScreen from '../../screens/login/StartScreen'
import LogIn from '../../screens/login/LogIn'
import ResetPassword from '../../screens/login/ResetPassword'
import LawWebsite from '../../presentation/LawWebsite'
import RegisterEyeStatus from '../../screens/registration/RegisterEyeStatus'

const AuthContainer = createStackNavigator({
    StartScreen,
    LogIn,
    ResetPassword,
    RegisterAccount,
    RegisterName,
    RegisterEyeStatus,
    RegisterPassword,
    LawWebsite
  }, {
      initialRouteName: "StartScreen",
      headerMode: 'none'
  })

const AuthNavigator = createAppContainer(AuthContainer)

export default AuthNavigator