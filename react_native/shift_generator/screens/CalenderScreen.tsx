import React, { useState } from "react";

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Calendar } from "react-native-calendars";
import moment from "moment";

const INITIAL_DATE = moment().format("YYYY-MM-DD");

export default function CalenderScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [selected, setSelected] = useState({});
  const handleDayPress = (day) => {

    var target = {...selected}
    var id = day.dateString;
    if(target[id]) {
      delete target[id];
    } else {
      target[id] = {
        selected: true,
        disableTouchEvent: false,
        selectedColor: 'pink',
        selectedTextColor: 'white'
      }; 
    }
    setSelected(target);
    console.log(day.dateString);
  }
  return (
    <View style={{paddingTop:40}}>
      <Calendar
        monthFormat={"yyyy年 MM月"}
        current={INITIAL_DATE}
        markedDates={selected }
        onDayPress={handleDayPress}
      />
    </View>
  );
}

