import { StyleSheet, View, FlatList, Text} from 'react-native';
import { useInfiniteQuery } from 'react-query';

import { useEffect, useState } from 'react';

import {getProfilesListFromDb2} from '../util/http';

import ProfileTile from '../components/ProfileTile';
import ImagePicker from '../components/ImagePicker';

function ProfileBasicList2({ navigation }){
    
    const[profileList, setProfileList] = useState();

    
    useEffect(() =>{
        
        console.log("In useEffect constuctor");

        const unsubscribe = navigation.addListener('focus', () => {
            
            console.log("In useEffect. Trying to fetch old data. HasPreviousPage? " + hasPreviousPage);
            //fetchPreviousPage();
            
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
          return unsubscribe;

    }, []);
    
    
    const { isLoading, data, hasNextPage, fetchNextPage, hasPreviousPage, fetchPreviousPage } = 
        useInfiniteQuery(
            'games',
            getProfilesListFromDb2,
            {
                getNextPageParam: lastPage => {
                    if (lastPage && lastPage.length>0 && lastPage[0] != undefined)
                    {
                        console.log("In getNextPageParam", lastPage);
                        /*if (lastPage.next !== null) {
                            return lastPage.next;
                        }
                        return lastPage;*/

                        console.log("Id is: " + lastPage[0].id);

                        //return lastPage[0].id;
                        return {'id':lastPage[0].id, 'direction': 'next'};
                    }
                    else
                    {
                        return null;
                    }
                },
                getPreviousPageParam: firstPage => {
                    
                    if (firstPage && firstPage.length>0 && firstPage[firstPage.length-1] != undefined)
                    {
                        var curElement = firstPage[firstPage.length-1];
                        console.log("In getPreviousPageParam. Id is ", curElement.id);
                        return {'id':curElement.id, 'direction': 'prev'};
                    }
                    else
                    {
                        console.log("In getPreviousPageParam null");
                        return null;
                    }
                }
            }
        );
    
    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const loadFrontData = () => {
        if (hasPreviousPage)
        {
            fetchPreviousPage();
        }
    }

    if(!isLoading)
    {
        console.log("isLoading?" + isLoading);
        console.log("Data is: ", JSON.stringify(data));
        data.pages.map(checkThis);

        function checkThis(cur)
        {
            console.log("Cur:"+JSON.stringify(cur));
        }

        //setProfileList()

        //setProfileList([...profileList, data.pages[data.pages.length-1]]);
        //setProfileList(data.pages[data.pages.length-1]);
    }

    function renderProfileItem(itemData)
    {
        console.log("itemData is: "+ itemData);
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

    return isLoading 
        ?
        (<View><Text> Loading .....</Text></View>)
        :
        (
        <View>
            
            <FlatList
                data={data.pages.map(page => page).flat()}
                renderItem={renderProfileItem}
                keyExtractor={(item) => item.id}
                onEndReached={loadMore}
                //onStartReached={loadFrontData}
            >

            </FlatList>
        </View>
    );
}

export default ProfileBasicList2;

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