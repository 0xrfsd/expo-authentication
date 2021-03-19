import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Text, Pressable } from 'react-native';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

// Definir um hook global [Authenticated, setAuthenticated] com createContext

// Usar bcrypt para salvar as senhas em hash
// Usar bcrypt para comparar as senhas com as hashs salvas

// Definir tempo da sessao ... expires

// setAuthenticated
// if(username && password === user.username && user.password) {
//   setAuthenticated(true);
//   generateUID(+id, user, expires);
//   store UID in AsyncStorage
// }

// Ways to implement the flow

// if(Authenticated) {
// return <App /> 
// } else {
// return <Auth /> 
// }

// {Authenticated ? <App /> : <Auth /> }

// App()
// Home, Profile...

// Auth
// SignIn, SignUp

import { LoginContext } from './src/utils/Context';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

    const [isAuthenticated, setIsAuthenticated] = React.useState(null)

    const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('@token')
          if(value !== null) {
              setIsAuthenticated(true);
          } 
        } catch(e) {
          // error reading value
        }
      }
      
      React.useEffect(() => {
        getToken();
      }, [])

    return (
        <NavigationContainer>
                <LoginContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <Stack.Navigator>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: true }} />
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }} />
                    </>
                )}
            </Stack.Navigator>
            </LoginContext.Provider>
        </NavigationContainer>
    )
}