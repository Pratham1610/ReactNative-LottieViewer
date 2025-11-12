import React, {useState} from 'react';
import MainScreen from '../screen/MainScreen';
import { Alert, Platform } from 'react-native';
import { pick, types } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';

const MainContainer = () => {
    const [selectedLottieFile, setSelectedLottieFile] = useState<string | null>(null);
    
    const onButtonPress = async () => {
        try {
            const result = await pick({
                type: [types.allFiles],
                allowMultiSelection: false,
            });
            
            if (result && result.length > 0) {
                const file = result[0];
                const fileName = file.name || '';
                
                if (fileName.toLowerCase().endsWith('.lottie')) {
                    let fileUri = file.uri;
                    if (Platform.OS === 'android' && fileUri.startsWith('content://')) {
                        try {
                            const tempPath = `${RNFS.CachesDirectoryPath}/${fileName}`;
                            await RNFS.copyFile(fileUri, tempPath);
                            fileUri = `file://${tempPath}`;
                            console.log('Copied file to:', fileUri);
                        } catch (copyError: any) {
                            console.error('Error copying file:', copyError);
                            Alert.alert('Error', 'Failed to access file. Please try again.');
                            return;
                        }
                    }
                    
                    setSelectedLottieFile(fileUri);
                } else {
                    Alert.alert('Invalid File', 'Please select a .lottie file');
                }
            }
        } catch (err: any) {
            if (err.isCancel) {
                console.log('User cancelled file picker');
            } else {
                Alert.alert('Error', 'Failed to pick file: ' + err.message);
                console.error('Error picking file:', err);
            }
        }
    }
    
    return <MainScreen onButtonPress={onButtonPress} selectedFile={selectedLottieFile} />;
}

export default MainContainer;