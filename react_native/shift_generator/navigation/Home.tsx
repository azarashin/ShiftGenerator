import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from '../screens/HomeScreen';
import CalenderScreen from '../screens/CalenderScreen';
import StaffListScreen from '../screens/StaffListScreen';
import YearMonthSelectScreen from '../screens/YearMonthSelectScreen';

import RequirementScreen from '../screens/RequirementScreen';
import StaffMenu from '../screens/StaffMenu'
import { SlotGroup } from '../common/data_accessor';

const Stack = createStackNavigator(); 

export default function Home() { 
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='メニュー画面'>
				<Stack.Screen name='メニュー画面' component ={HomeScreen} />
				<Stack.Screen name='従業員一覧' component ={StaffListScreen} />
				<Stack.Screen name='カレンダー' component ={CalenderScreen} />
				<Stack.Screen name='従業員メニュー' component ={StaffMenu} />
				<Stack.Screen name='シフト生成年月指定' component ={YearMonthSelectScreen} />
				

				<Stack.Screen name={SlotGroup[0]} component={RequirementScreen} />
				<Stack.Screen name={SlotGroup[1]} component={RequirementScreen} />
				<Stack.Screen name={SlotGroup[2]} component={RequirementScreen} />
				<Stack.Screen name={SlotGroup[3]} component={RequirementScreen} />
				<Stack.Screen name={SlotGroup[4]} component={RequirementScreen} />
				<Stack.Screen name={SlotGroup[5]} component={RequirementScreen} />
				<Stack.Screen name={SlotGroup[6]} component={RequirementScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
