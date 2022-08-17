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
 import TabOneScreen from '../screens/TabOneScreen';
 import TabTwoScreen from '../screens/TabTwoScreen';
 import CalenderScreen from '../screens/CalenderScreen';
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
       initialRouteName="日"
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].tint,
       }}>
       <BottomTab.Screen
         name="日"
         component={TabTwoScreen}
         options={{
           title: '日',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="月"
         component={TabTwoScreen}
         options={{
           title: '月',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="火"
         component={TabTwoScreen}
         options={{
           title: '火',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="水"
         component={TabTwoScreen}
         options={{
           title: '水',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="木"
         component={TabTwoScreen}
         options={{
           title: '木',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="金"
         component={TabTwoScreen}
         options={{
           title: '金',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="土"
         component={TabTwoScreen}
         options={{
           title: '土',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
 