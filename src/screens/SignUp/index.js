import React from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { LoginContext } from '../../utils/Context';

export default function SignUp() {

    const navigation = useNavigation();

    const [usernameReq, setUsernameReq] = React.useState("")
    const [passwordReq, setPasswordReq] = React.useState("")
    const [error, setError] = React.useState("")

    const { isAuthenticated, setIsAuthenticated } = React.useContext(LoginContext)

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@token', jsonValue).then(() => console.log('Token stored.'))
        } catch (e) {
            // saving error
        }
    }

    const register = async () => {
        await Axios.post('http://localhost:3000/register', {
            username: usernameReq,
            password: passwordReq,
        }).then((response) => {
            if (response.status == 200) {
                if (response.data.data) {
                    storeData(response.data.data)
                    Alert.alert('Usuario registrado com sucesso!');
                    if (usernameTextInput && passwordTextInput == null) {
                        usernameTextInput.current.clear()
                        passwordTextInput.current.clear()
                    } else {
                        usernameTextInput.current.clear()
                        passwordTextInput.current.clear()  
                    }
                    setIsAuthenticated(true)
                }
                else {
                    setError(response.data.error);
                    if (passwordTextInput && usernameTextInput != null) {
                        passwordTextInput.current.clear()
                    } else {
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
                    style={inputStyle}
                    ref={usernameTextInput}
                    placeholder="Username"
                    autoCapitalize="none"
                    onChangeText={(username) => {
                        setUsernameReq(username);
                    }}
                />
                <TextInput
                    style={inputStyle}
                    ref={passwordTextInput}
                    secureTextEntry={true}
                    placeholder="Senha"
                    onChangeText={(password) => {
                        setPasswordReq(password);
                    }}
                />
                <Pressable
                    onPress={register}
                    style={buttonStyle}>
                    <Text style={textStyle}>SignUp</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('SignIn')} style={{ justifyContent: 'center', alignItems: 'center', width: '90%', marginLeft: '5%', marginRight: '5%', borderRadius: 10, backgroundColor: '#cdcdcd', height: 50 }}>
                    <Text style={{ color: '#333' }}>SignIn</Text>
                </Pressable>
            </View>
        </View>
    )
}

const inputStyle = {
    width: '90%', margin: '5%', borderBottomColor: '#333', borderRadius: 10, color: '#333'
}

const buttonStyle = {
    justifyContent: 'center', alignItems: 'center', width: '90%', margin: '5%', borderRadius: 10, backgroundColor: '#333', height: 50
}

const textStyle = {
    color: '#fff'
}