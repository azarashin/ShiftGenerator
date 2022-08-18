/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { FontAwesome } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { ColorSchemeName, Pressable } from 'react-native';
 
 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useColorScheme';
 import ModalScreen from '../screens/ModalScreen';
 import NotFoundScreen from '../screens/NotFoundScreen';
 import RequirementScreen from '../screens/RequirementScreen';
 import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
 
 export default function Requirement({ colorScheme }: { colorScheme: ColorSchemeName }) {
    // 入れ子にする場合はindependent={true} を指定する必要あり。
   return (
     <NavigationContainer independent={true}
       linking={LinkingConfiguration}
       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <RootNavigator />
     </NavigationContainer>
   );
 }
 
 /**
  * A root stack navigator is often used for displaying modals on top of all other content.
  * https://reactnavigation.org/docs/modal
  */
 const Stack = createNativeStackNavigator<RootStackParamList>();
 
 function RootNavigator() {
   return (
     <Stack.Navigator>
       <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
       <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
       <Stack.Group screenOptions={{ presentation: 'modal' }}>
         <Stack.Screen name="Modal" component={ModalScreen} />
       </Stack.Group>
     </Stack.Navigator>
   );
 }
 
 /**
  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */
 const BottomTab = createBottomTabNavigator<RootTabParamList>();
 
 function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName='日'
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].tint,
       }}>
       <BottomTab.Screen
         name='日曜日'
         component={RequirementScreen}
         options={{
           title: '日曜日',
           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
         }}
       />
       <BottomTab.Screen
         name='月曜日'
         component={RequirementScreen}
         options={{
           title: '月曜日',
           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
         }}
       />
       <BottomTab.Screen
         name='火曜日'
         component={RequirementScreen}
         options={{
           title: '火曜日',
           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
         }}
       />
       <BottomTab.Screen
         name='水曜日'
         component={RequirementScreen}
         options={{
           title: '水曜日',
           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
         }}
       />
       <BottomTab.Screen
         name='木曜日'
         component={RequirementScreen}
         options={{
           title: '木曜日',
           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
         }}
       />
       <BottomTab.Screen
         name='金曜日'
         component={RequirementScreen}
         options={{
           title: '金曜日',
           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
         }}
       />
       <BottomTab.Screen
         name='土曜日'
         component={RequirementScreen}
         options={{
           title: '土曜日',
           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
         }}
       />
       
     </BottomTab.Navigator>
   );
 }
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }
 