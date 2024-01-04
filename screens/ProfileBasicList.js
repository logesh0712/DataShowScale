import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';

import { useEffect, useState } from 'react';

import {getProfilesListFromDb} from '../util/http';

import ProfileTile from '../components/ProfileTile';
import ImagePicker from '../components/ImagePicker';

function ProfileBasicList(){
    
    const[profileList, setProfileList] = useState();

    useEffect(() =>{
        async function getProfilesList(){
            try
            {
                const profileListFromDb = await getProfilesListFromDb();
                setProfileList(profileListFromDb);
            }
            catch(error)
            {
                Alert.alert(error.message);
            }
        }

        getProfilesList();
    }, []);

    function renderProfileItem(itemData)
    {
        const item = itemData.item;
        
        return (
            <View style={styles.container}>
                <ProfileTile labelName={"Full name"} textValue={item.fullName}> </ProfileTile>
                <ProfileTile labelName={"Date of birth"} textValue={item.dob}> </ProfileTile>
                <ProfileTile labelName={"Height"} textValue={item.height}> </ProfileTile>
                <ProfileTile labelName={"Education"} textValue={item.Education}> </ProfileTile>
                <ProfileTile labelName={"Occupation"} textValue={item.occupation}> </ProfileTile>
                <ProfileTile labelName={"City"} textValue={item.city}> </ProfileTile>
                <ProfileTile labelName={"Country"} textValue={item.country}> </ProfileTile>
                <ProfileTile labelName={"Hatty"} textValue={item.hatty}> </ProfileTile>
                <ProfileTile labelName={"Semmai"} textValue={item.seemai}> </ProfileTile>
            </View>
        );
    }

    return (
        <View>
            <ImagePicker>

            </ImagePicker>

            <FlatList
                data={profileList}
                renderItem={renderProfileItem}
                keyExtractor={(item) => item.id}
            >

            </FlatList>
        </View>
    );
}

export default ProfileBasicList;

const styles=StyleSheet.create({
    container:{
        borderBottomColor: 'red',
        borderRadius: 2,
        elevation: 2,
        marginVertical: 5,
        padding: 10
        //backgroundColor: 'red'
    }
});