import React, { useState } from "react";

import { View } from '../components/Themed';
import { RadioButton } from 'react-native-paper';

import { StyleSheet, Text, ColorValue, StyleProp, ViewStyle, Falsy, RecursiveArray, RegisteredStyle } from 'react-native';
import { Calendar, DateData } from "react-native-calendars";
import { useRoute} from '@react-navigation/native'
import moment from "moment";

import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking'
import {DALoad_StaffWish, DASave_StaffWish, WishData, WishType, EnumWishType, WishTypeLabel} from '../common/data_accessor'

const INITIAL_DATE = moment().format("YYYY-MM-DD");

const color_wish: ColorValue = 'cyan'
const color_refuse: ColorValue = 'pink'
const color_neutral: ColorValue = 'white'
const color_map : {[index: string]: string} = {'wish': color_wish, 'refuse': color_refuse, 'neutral': color_neutral}; 
const background_map : {[index: string]: string} = {'wish': 'white', 'refuse': 'white', 'neutral': 'black'}; 

export default function CalenderScreen() {
  const route = useRoute();
  var staff = route.params.staff;



  const [checked, setChecked] = useState(EnumWishType.neutral);
  const [wish_list, setWishList] = useState({});
  const [month, setMonth] = useState(new Date());
  const [current_staff, setCurrentStaff] = useState('');


  const handleDayPress = (date: DateData) => {
    var target : WishData = {...wish_list}
    var id : string = date.dateString;
    if(target[id] && checked == EnumWishType.neutral) {
      delete target[id];
    } else {
      target[id] = checked; 
    }
    setWishList(target);
    DASave_StaffWish(staff, new Date(date.year, date.month - 1, date.day), target);
    console.log(date.dateString);
  }

  function onCompleteLoad(ret_wish: WishData, staff: string, date: Date) : void
  {
    setWishList(ret_wish);
  }

  const onMonthChange = (date : DateData) => {
    console.log('month changed', date);
    setMonth(new Date(date.year, date.month, date.day));
    DALoad_StaffWish(staff, month, onCompleteLoad); 
  }

  if(current_staff != staff)
  {
    DALoad_StaffWish(staff, month, onCompleteLoad); 
    setCurrentStaff(staff); 
  }

  function WishRadioButton(props: { 
    style: any; 
    value: EnumWishType; 
  })
  {
    return (
      <RadioButton.Item style={props.style}
      value={props.value}
      label={WishTypeLabel[props.value]}
      status={checked == props.value ? 'checked' : 'unchecked'}
      onPress={() => { setChecked(props.value ); console.log(props.value);}}
    />); 

  }

  return (
    <View style={{paddingTop:40}}>
      <Text style={styles.title}>{staff}さんのシフト希望</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Calendar
        monthFormat={"yyyy年 MM月"}
        current={INITIAL_DATE}
        markedDates={Update_StaffWish(wish_list) }
        onDayPress={handleDayPress}
        onMonthChange={onMonthChange}
      />


      <View style={styles.wish_container}>
        <WishRadioButton value={EnumWishType.wish}    style={styles.wish} />
        <WishRadioButton value={EnumWishType.refuse}  style={styles.refuse} />
        <WishRadioButton value={EnumWishType.neutral} style={styles.neutral} />
      </View>
    </View>
  );
}

// 本来なら
// react-native-calendars/src/calendar
// で定義されているものをそのまま使いたいが、export 指定されておらず、このファイルから参照できないので
// 改めて定義しなおす。
export declare type MarkedDatesType = {
  [key: string]: MarkingProps;
};

function Update_StaffWish(data : WishData) : MarkedDatesType
{
  var target : MarkedDatesType = {};
  for(var id in data)
  {
    target[id] = {
      selected: true,
      disableTouchEvent: false,
      selectedColor: color_map[data[id]],
      selectedTextColor: background_map[data[id]]
    }; 
  }
  return target;
}


const styles : {[index: string]: StyleProp<ViewStyle>} = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  wish_container: {
    color: '#00FF00',
    fontSize: 24,
  },
  wish: {
    backgroundColor: color_wish, 
    fontSize: 24,
  },
  refuse: {
    backgroundColor: color_refuse, 
    fontSize: 24,
  },
  neutral: {
    backgroundColor: color_neutral, 
    fontSize: 24,
  },
});


