import {Button, View, Text, StyleSheet, Alert} from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native';

//storage:
import { ref, uploadBytes } from "firebase/storage";
import { getStorage, getDownloadURL } from "firebase/storage";
import { storage } from '../config';

import * as ImagePickerLib from 'expo-image-picker';


function ImagePicker()
{
    const [cameraPermissionInformation, requestPermission] = ImagePickerLib.useCameraPermissions();
    
    const [pickedImage, setPickedImage] = useState(null);

    const [imageUriUri, setImageUriUri] = useState(null);

    //const [image, setImage] = useState(null);

    async function getImageUrl(imageName)
    {
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, imageName));

        console.log("Image url: "+ url);
        return url;
    } 

    async function uploadImage()
    {
       try{
        const imageUri = pickedImage[0].uri;

        console.log("In upload1:" + imageUri);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileName = imageUri.substring(imageUri.lastIndexOf('/')+1);

        console.log("In upload2:" + fileName);
        
        const storageRef = ref(storage, fileName);
            

        const res = await uploadBytes(storageRef, blob);

        console.log('Uploaded a blob or file!', res);

        let url = await getImageUrl(fileName);
        console.log("Returned Url is " + url);

        setImageUriUri(url);
        
        }
       catch(error)
       {
            console.log(error.message);
       }

    }

    async function verifyCameraPermission(){
        if (cameraPermissionInformation.status === ImagePickerLib.PermissionStatus.UNDETERMINED
            || cameraPermissionInformation.status === ImagePickerLib.PermissionStatus.DENIED
            ){
            console.log("In undetermained");
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === ImagePickerLib.PermissionStatus.DENIED)
        {
            Alert.alert("No permission to access camera!!");
            return false;
        }

        return true;
    }

    async function takeImageHandler()
    {
        const hasPermission = await verifyCameraPermission();

        if(!hasPermission)
        {
            return;
        }

        const image = await ImagePickerLib.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,

        });

        //console.log(image);
        //setPickedImage(image.uri);
        setPickedImage(image.assets);


        //const source =  {uri: image.uri};
        //setImage(source);
    }
    
    /*
    async function verifyCameraRollPermission(){
        
        //let phonePermissionInformation = await ImagePickerLib.Permissions.getAsync(Permissions.CAMERA_ROLL);
        ImagePickerLib.Permissions

        if (phonePermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (phonePermissionInformation.status === PermissionStatus.DENIED)
        {
            Alert.alert("No permission to access camera roll/ Photo library!!");
            return false;
        }

        return true;
    }
*/
    async function chooseImageHandler()
    {
        /*const hasPermission = await verifyCameraRollPermission();

        if(!hasPermission)
        {
            return;
        }
*/
        const image = await ImagePickerLib.launchImageLibraryAsync({
            mediaTypes: ImagePickerLib.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,

        });

        //console.log("Choose: " + image.assets[0].url);

        setPickedImage(image.assets);

        console.log("Choice is: "+pickedImage[0].uri);

        //const source =  {uri: image.uri};
        //setImage(source);
    }

   

    let imagePreview = <Text> No image to show</Text>;
    if(pickedImage)
    {
        imagePreview = <Image style={styles.image} source={{
            uri: pickedImage[0].uri
        }}></Image>;
    }

    //let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/cloudfunctions-27c66.appspot.com/o/Rajinikanth_Felicitates_Writer_Kalaignanam_1.jpg?alt=media&token=7bb0b79b-11bf-4fe8-ba1c-783ef49ae0b5';
    //let imageUrl2 = 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajinikanth_Felicitates_Writer_Kalaignanam_1.jpg';
    //let imageUrl = getImageUrl('e8304086-0c2c-47d9-9e0f-97061c7ad8c1.jpeg');
    let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/cloudfunctions-27c66.appspot.com/o/e8304086-0c2c-47d9-9e0f-97061c7ad8c1.jpeg?alt=media&token=4ebd7a63-f495-42a2-83d1-177723e67c0e';
    //console.log("Image url is " + imageUrl.imageUrl);


    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>

            <View>
                <Button title="Choose Image" onPress={chooseImageHandler}></Button>
                <Button title="Take Image" onPress={takeImageHandler}></Button>
                <Button title="Upload Image" onPress={uploadImage}></Button>
            </View>

            <View style={styles.imagePreview}>
                <Image source={{uri: imageUriUri}} style={styles.image}></Image>
            </View>
        </View>
    );
}

export default ImagePicker;


const styles = StyleSheet.create({
    imagePreview:{
        width : '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 4
    },
    image:{
        width: '100%',
        height: '100%'
    }
});