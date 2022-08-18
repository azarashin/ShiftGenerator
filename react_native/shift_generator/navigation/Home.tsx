import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from '../screens/HomeScreen';
import CalenderScreen from '../screens/CalenderScreen';
import Requirement from '../navigation/Requirement';

import RequirementScreen from '../screens/RequirementScreen';

const Stack = createStackNavigator(); 

export default function Home() { 
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='メニュー画面'>
				<Stack.Screen name='メニュー画面' component ={HomeScreen} />
				<Stack.Screen name='カレンダー' component ={CalenderScreen} />


				<Stack.Screen name='日曜日' component={RequirementScreen} />
				<Stack.Screen name='月曜日' component={RequirementScreen} />
				<Stack.Screen name='火曜日' component={RequirementScreen} />
				<Stack.Screen name='水曜日' component={RequirementScreen} />
				<Stack.Screen name='木曜日' component={RequirementScreen} />
				<Stack.Screen name='金曜日' component={RequirementScreen} />
				<Stack.Screen name='土曜日' component={RequirementScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
