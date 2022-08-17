import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from '../screens/HomeScreen';
import CalenderScreen from '../screens/CalenderScreen';
import Requirement from '../navigation/Requirement';

const Stack = createStackNavigator(); 

export default function Home() { 
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='メニュー画面'>
				<Stack.Screen name='メニュー画面' component ={HomeScreen} />
				<Stack.Screen name='シフト枠の設定' component ={Requirement} />
				<Stack.Screen name='カレンダー' component ={CalenderScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
