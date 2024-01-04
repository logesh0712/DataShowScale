import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import ProfileBasicList from './screens/ProfileBasicList';

// Navigators
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Recommendations" 
            component={ProfileBasicList}
          >
            
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  
});
