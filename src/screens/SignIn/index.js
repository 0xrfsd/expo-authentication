import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginContext } from '../../utils/Context';

export default function SignIn() {

    const navigation = useNavigation();

    const { isAuthenticated, setIsAuthenticated } = useContext(LoginContext)

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@token', jsonValue).then(() => console.log('Token stored.'))
        } catch (e) {
            // saving error
        }
    }

    const login = async () => {
        await axios.post('http://localhost:3000/login', {
            username: username,
            password: password
        }).then((response) => {
            if (response.status == 200) {
                if (response.data.status === "ok") {
                    if (usernameTextInput && passwordTextInput != null) {
                        usernameTextInput.current.clear()
                        passwordTextInput.current.clear()
                    }
                    storeData(response.data.data).then(() => setIsAuthenticated(true))
                } else {
                    if (response.data.error === 'Invalid password') {
                        if (passwordTextInput != null) {
                            passwordTextInput.current.clear()
                        }
                    }
                    setError(response.data.error)
                    if (usernameTextInput && passwordTextInput != null) {
                        usernameTextInput.current.clear()
                        passwordTextInput.current.clear()
                    }
                }

            }
        });
    };

    const usernameTextInput = React.createRef();
    const passwordTextInput = React.createRef();

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
            <View style={{ flexDirection: 'column', width: '100%', justifyContent: 'space-around' }}>
                {error ? <View style={{ width: '90%', margin: '5%', height: 50, borderRadius: 10, backgroundColor: '#cd5c5c', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#333' }}>{error}</Text>
                </View> : null}
                <TextInput
                    ref={usernameTextInput}
                    style={{ width: '90%', margin: '5%', borderBottomColor: '#333', borderRadius: 10, color: '#333' }}
                    placeholder="Nome"
                    autoCapitalize="none"
                    onChangeText={(username) => setUsername(username)}
                />
                <TextInput
                    ref={passwordTextInput}
                    secureTextEntry={true}
                    style={{ width: '90%', margin: '5%', borderRadius: 10, color: '#333' }}
                    placeholder="Senha"
                    onChangeText={(pasword) => setPassword(pasword)}
                />
                <Pressable onPress={login} style={{ justifyContent: 'center', alignItems: 'center', width: '90%', margin: '5%', borderRadius: 10, backgroundColor: '#333', height: 50 }}>
                    <Text style={{ color: '#fff' }}>SignIn</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('SignUp')} style={{ justifyContent: 'center', alignItems: 'center', width: '90%', marginLeft: '5%', marginRight: '5%', borderRadius: 10, backgroundColor: '#cdcdcd', height: 50 }}>
                    <Text style={{ color: '#333' }}>SignUp</Text>
                </Pressable>
            </View>
        </View>
    )
}