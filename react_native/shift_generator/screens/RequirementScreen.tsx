import { StyleSheet } from 'react-native';
import React, { useState } from "react";

import Slider from '@react-native-community/slider'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import {DALoad_Slot, DASave_Slot} from '../common/data_accessor'

export default function RequirementScreen(props: { route: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; key: any; }; navigation: any; }) {

  //console.log(Object.keys(props.route.params));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.name}に必要な従業員数を指定してください</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <ShiftSlider id={props.route.name + ':0'} slot_name="午前"/>
      <ShiftSlider id={props.route.name + ':1'} slot_name="正午～夕方"/>
      <ShiftSlider id={props.route.name + ':2'} slot_name="夜"/>
    </View>
  );
}

function ShiftSlider(props: { id: string, slot_name: string})
{
  const [required, setRequired] = useState(0);
  const [init, setInit] = useState(false);

  DALoad_Slot(props.id, (retRequired: number) => {
    console.log(retRequired);
    setRequired(retRequired);
    setInit(true);
    DASave_Slot(props.id, retRequired); 
  }); 

  function onChangeValue(val: number)
  {
    if(init)
    {
      setRequired(val);
      console.log('save: ' + props.id + ':' + val);
      DASave_Slot(props.id, val); 
    }
  }

 
  return (
    <View style={styles.container}>
      <Text style={styles.slider_text}>
        [時間帯] {props.slot_name}
      </Text>
      <Text style={styles.slider_text}>
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
  );
}

const styles = StyleSheet.create({
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
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 0,
  },
});
