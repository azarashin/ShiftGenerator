import { StyleSheet, Button } from 'react-native';
import React, { useState } from "react";

import Slider from '@react-native-community/slider'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import {DALoad_Slot, DASave_Slot, EnumWishType, WishTypeLabel, MakeSlotIDByGroup} from '../common/data_accessor'
import {useNavigation} from '@react-navigation/native'

export default function RequirementScreen(props: { route: { name: string}; navigation: any; }) {

  //console.log(Object.keys(props.route.params));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.name}に必要な従業員数を指定してください</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <ShiftSlider prefix={props.route.name} slot={EnumWishType.wish_morning}/>
      <ShiftSlider prefix={props.route.name} slot={EnumWishType.wish_afternoon}/>
      <ShiftSlider prefix={props.route.name} slot={EnumWishType.wish_night}/>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <WeekSelector/>
    </View>
  );
}

function ShiftSlider(props: { prefix: string, slot: EnumWishType})
{
  var group = props.prefix; 
  var sub_group = props.slot; 
  var id: string = MakeSlotIDByGroup(group, sub_group);
  var slot_name: string = WishTypeLabel[props.slot];
  const [required, setRequired] = useState(0);
  const [init, setInit] = useState(false);
  console.log(id);

  DALoad_Slot(id, (retRequired: number) => {
    console.log(retRequired);
    setRequired(retRequired);
    setInit(true);
    DASave_Slot(id, retRequired); 
  }); 

  function onChangeValue(val: number)
  {
    if(init)
    {
      setRequired(val);
      console.log('save: ' + id + ':' + val);
      DASave_Slot(id, val); 
    }
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.slider_text}>
        <Text style={styles.slider_text_slot}>
          {slot_name}
        </Text>
        <Text style={styles.slider_text_requirement}>
          従業員数: {required}
        </Text>
        <Slider style={styles.slider}
          step={1}
          maximumValue={5}
          onValueChange={onChangeValue}
          onSlidingStart={() => {console.log('onSlidingStart');}}
          value={required}
        />
      </View>
    </View>
  );
}


function WeekSelector() {

  const navigation = useNavigation(); 

  return (
    <View>
      <View style={styles.work_buttons}>
        <View style={styles.work_button}><Button title='日' onPress={() => {navigation.navigate('日曜日');}}/></View>
        <View style={styles.work_button}><Button title='月' onPress={() => {navigation.navigate('月曜日');}}/></View>
        <View style={styles.work_button}><Button title='火' onPress={() => {navigation.navigate('火曜日');}}/></View>
        <View style={styles.work_button}><Button title='水' onPress={() => {navigation.navigate('水曜日');}}/></View>
        <View style={styles.work_button}><Button title='木' onPress={() => {navigation.navigate('木曜日');}}/></View>
        <View style={styles.work_button}><Button title='金' onPress={() => {navigation.navigate('金曜日');}}/></View>
        <View style={styles.work_button}><Button title='土' onPress={() => {navigation.navigate('土曜日');}}/></View>
      </View>
      <Button title='メニュー' onPress={() => {navigation.navigate('メニュー画面');}}/>
    </View>
  );
}


const styles = StyleSheet.create({
  work_buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  work_button: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 4,
  },
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
  slider: {
    width: 200, 
    height: 20
  },
  slider_text: {
    textAlign: 'left',
    fontWeight: '500',
    margin: 0,
  },
  slider_text_slot: {
    fontSize: 14,
  },
  slider_text_requirement: {
    fontSize: 16,
  },
});
