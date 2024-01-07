import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import ProfileBasicList from './screens/ProfileBasicList';
import ProfileBasicList2 from './screens/ProfileBasicList2';
import { QueryClient, QueryClientProvider } from 'react-query';
// Navigators
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileBasicList3 from './screens/ProfileBasicList3';
import Test from './screens/test';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const queryClient = new QueryClient();

function BottomTabView(){
  return (
    <BottomTabs.Navigator>
      
      <BottomTabs.Screen 
        name="Test" 
        component={ProfileBasicList3}
        options={{
          title:'Recommendations',
          //tabBarLabel: 'Recent',
          //tabBarButton: CustomTabButton,
          //tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color}></Ionicons>
        }}
      >
      </BottomTabs.Screen>

      <BottomTabs.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          title:'Favorites',
          //tabBarLabel: 'All',
          //tabBarButton: CustomTabButton,
          //tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color}></Ionicons>
        }}
      >
      </BottomTabs.Screen>

      


    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      
      <QueryClientProvider client={queryClient}>

      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Recommendations" 
            component={BottomTabView}
            options={{headerShown: false}}
          >
            
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  
});
