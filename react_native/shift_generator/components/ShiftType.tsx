import { RadioButton } from 'react-native-paper';
import React, { useState } from "react";

import {
    StyleSheet,
    View,
    TextProps, 
  } from 'react-native';

export function ShiftType(props: TextProps) {
    const [checked, setChecked] = useState({});
  

    return (
        <View style={styles.container}>
            <RadioButton.Item
                value="wish"
                label="シフトを希望する日"
                status={checked === 'wish' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('wish' ); console.log('wish');}}
            />
            <RadioButton.Item
                value="refuse"
                label="シフトを希望しない日"
                status={checked === 'refuse' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('refuse' );  console.log('refuse');}}
            />
            <RadioButton.Item
                value="neutral"
                label="シフトが入ってもよい日"
                status={checked === 'neutral' ? 'checked' : 'unchecked'}
                onPress={() => { setChecked('neutral' );  console.log('neutral');}}
            />
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
      color: '#00FF00',
      fontSize: 24,
    },
  });

  