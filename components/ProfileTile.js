import {View, Text, StyleSheet} from 'react-native';

function ProfileTile({labelName, textValue})
{
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.textLabel}>{labelName}</Text>
            </View>

            <View>
                <Text>{textValue}</Text>
            </View>
        </View>
    );
}

export default ProfileTile;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    textLabel:{
        fontWeight: 'bold'
    },
    textValue:{

    }
});