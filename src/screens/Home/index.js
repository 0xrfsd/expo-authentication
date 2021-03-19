import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { LoginContext } from '../../utils/Context';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

    const { isAuthenticated, setIsAuthenticated } = React.useContext(LoginContext)

    const [tokenValue, setTokenValue] = React.useState("");

    const navigation = useNavigation();

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token').then((valueData) => setTokenValue(valueData))
        } catch (e) {
            // error reading value
        }
    }

    React.useEffect(() => {
        getToken();
    }, [])

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('@token').then(() => console.log('Token removed.'))
            await AsyncStorage.getItem('@token').then((iToken) => console.log('now your token is ' + iToken))
        } catch (e) {
            // remove error
        }
    }

    const logout = async () => {
        await removeValue();
        setIsAuthenticated(false)
    }

    // React.useEffect(() => {
    //     logout()
    // }, [])

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#333' }}>
            <Text style={{ color: '#fff' }}>Home</Text>
            <Text style={{ color: '#fff' }}>Your token is: {tokenValue}</Text>
            {isAuthenticated ? <Text>You're logged in</Text> : <Text>You're not logged in</Text>}
            <Pressable style={{ borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: '90%', margin: '5%', height: 50, backgroundColor: '#fff' }} onPress={() => logout()}>
                <Text style={{ color: '#333' }}>Sign Out</Text>
            </Pressable>
        </View>
    )
}