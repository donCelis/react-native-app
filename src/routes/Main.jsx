import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screenOptions } from '../theme'

import { PATH_AUTH, PATH_PAGE } from './paths'
/* Components */
import LogIn from '../pages/LogIn'
import Home from './Home'
import UserDetail from '../pages/UserDetail'
import UpdateUser from '../pages/UpdateUser'
import { StatusBar } from 'expo-status-bar'

const Stack = createNativeStackNavigator()

export default function Main () {
  return (
    <>
      <StatusBar style='dark' />
      <Stack.Navigator
        initialRouteName={PATH_AUTH.signin}
        screenOptions={{ headerShown: false, ...screenOptions }}
      >
        <Stack.Screen
          name={PATH_AUTH.signin}
          component={LogIn}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen
          name={PATH_PAGE.home}
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Group
          screenOptions={({ route }) => ({
            title: route.params.screen,
            headerShown: true
          })}
        >
          <Stack.Screen name={PATH_PAGE.detail} component={UserDetail} />
          <Stack.Screen
            name={PATH_PAGE.update}
            component={UpdateUser}
            options={{
              presentation: 'modal'
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </>
  )
}
