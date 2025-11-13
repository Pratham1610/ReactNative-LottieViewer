import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const MainScreen = (props: any) => {
    const { onButtonPress, selectedFile } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{'Choose a Lottie File'}</Text>
            <TouchableOpacity style={styles.button} onPress={onButtonPress} activeOpacity={0.8}>
                <Text style={styles.buttonText}>{'Choose Now'}</Text>
            </TouchableOpacity>
            {selectedFile && (
                <LottieView 
                    source={{uri: selectedFile}} 
                    autoPlay 
                    loop 
                    style={styles.lottie}
                    onAnimationFailure={(error) => {
                        console.error('Lottie animation failed:', error);
                    }}
                    onAnimationLoaded={() => {
                        console.log('Lottie animation loaded successfully');
                    }}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        marginTop: 24,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lottie: {
        width: 400,
        height: 400,
        marginTop: 24,
        resizeMode: 'contain',
    },
    fileInfo: {
        marginTop: 10,
        fontSize: 10,
        color: 'gray',
        textAlign: 'center',
        paddingHorizontal: 20,
    }
});

export default MainScreen;