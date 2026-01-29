import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
} from 'react-native';
import Button from '../utils/Button';
import GlobalStyle from '../utils/GlobalStyle';

function HomeScreen({ navigation, route }) {}

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        getData();  
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        var user = JSON.parse(value);
                        setName(user.Name);
                        setAge(user.Age);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                var user = {
                    Name: name,
                    Age: age
                }
                await AsyncStorage.setItem('UserData', JSON.stringify(user));
                Alert.alert('Success!', 'Data updated successfully.');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            await AsyncStorage.clear('UserData');
            navigation.navigate('Login Screen');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body}>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Welcome {name} !
            </Text>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Your age is {age}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={name}
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                value={age}
                onChangeText={(value) => setAge(value)}
            />
            <Button
                title='Update'
                color='#ff7f00'
                onPressFunction={updateData}
            />
            <Button
                title='Remove'
                color='#f40100'
                onPressFunction={removeData}
            />
        </View>
    )


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        margin: 10,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
    }
})

export default HomeScreen;