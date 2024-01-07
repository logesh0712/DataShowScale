import { StyleSheet, View, FlatList, Text} from 'react-native';
import { useEffect, useState } from 'react';

function Test()
{
    const[profileList, setProfileList] = useState();

    useEffect(() =>{
        
        const data=[
            {
                'id':1,
                'name':'A'
            },
            {
                'id':2,
                'name':'B'
            },
            {
                'id':3,
                'name':'C'
            },
            {
                'id':4,
                'name':'D'
            },
            {
                'id':5,
                'name':'E'
            }
        ]
        setProfileList(data);

    }, []);

    function renderProfileItem(itemData)
        {
            //console.log("itemData is: "+ itemData);
            //console.log("itemData is: "+ JSON.stringify(itemData));
            return (
                <View>
                    <Text>{itemData.item.id}</Text>
                    <Text>{itemData.item.name}</Text>
                </View>
            );
        }

    return (
        //!isLoading && 
        <View>
            <FlatList
                data = {profileList}
                renderItem={renderProfileItem}
                keyExtractor={(item) => item.id}
            >

            </FlatList>
        </View>
    );
}

export default Test;