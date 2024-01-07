import { StyleSheet, View, FlatList, Text} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import {getProfilesListFromDb3} from '../util/http';
import { useEffect, useState } from 'react';

function ProfileBasicList3(){
    const [latestDataTime , setLatestDataTime] = useState();

    useEffect(() =>{
        setLatestDataTime(new Date());
        /*        
        console.log("In useEffect constuctor");

        const unsubscribe = navigation.addListener('focus', () => {
            
            console.log("In useEffect. Trying to fetch old data. HasPreviousPage? " + hasPreviousPage);
            //fetchPreviousPage();
            
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
          return unsubscribe;
        */
    }, []);

    const { isLoading, data, hasNextPage, fetchNextPage, hasPreviousPage, fetchPreviousPage } = 
        useInfiniteQuery(
            'getProfilesListFromDb3',
            getProfilesListFromDb3,
            {
                getNextPageParam: lastPage => {
                    if (lastPage!==null && lastPage != undefined && lastPage.nextInput!= null && lastPage.nextInput != undefined)
                    {
                        console.log("In getNextPageParam. Id : " + lastPage.nextInput);

                        return {'id':lastPage.nextInput, 'direction': 'next'};
                    }
                    else
                    {
                        console.log("In getNextPageParam null");
                        return null;
                    }
                }
                ,getPreviousPageParam: firstPage => {
                    
                    if (firstPage!=null 
                        && firstPage!=undefined 
                        && firstPage.previousInput!=null 
                        && firstPage.previousInput != undefined)
                    {
                        // Also send this if last refreshed previous is more than 1 minute or so.
                        return {'id':firstPage.previousInput, 'direction': 'prev'};
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
            console.log("has next page?:" + hasNextPage);
            if (hasNextPage) {
                fetchNextPage();
            }
        };

        const loadFrontData = () => {
            var curTime = new Date();
            var secondsDiff = Math.round((curTime - latestDataTime)/1000);
            console.log("diff: " + secondsDiff);
            console.log("has front data", hasPreviousPage);
            if (hasPreviousPage && secondsDiff>60)
            {
                setLatestDataTime(new Date());
                fetchPreviousPage();
            }
        }

        function renderProfileItem(itemData)
        {
            if (itemData == undefined || itemData.item == undefined) return null;
            //console.log("itemData is: "+ itemData);
            //console.log("itemData is: "+ JSON.stringify(itemData));
            return (
                <View style={styles.container}>
                    <Text>{itemData.item.id}</Text>
                    <Text>{itemData.item.name}</Text>
                </View>
            );
        }

        if (!isLoading)
        {
            console.log("Pages: " + JSON.stringify(data));
        }

        return (
            !isLoading && 
            <View>
                <FlatList
                    data={data.pages.map(page => page.results).flat()}
                    renderItem={renderProfileItem}
                    keyExtractor={(item, index) => item.id}
                    onEndReached={loadMore}
                    onStartReached={loadFrontData}
                >

                </FlatList>
            </View>
        );
}

export default ProfileBasicList3;

styles = StyleSheet.create({
    container:{
        margin: 40,
        borderColor:'red',
        borderRadius: 2,
        borderBottomColor: 'green',
        borderWidth: 1,
        padding: 40,
        alignItems: 'center'
    }
});