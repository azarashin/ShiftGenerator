import { StyleSheet, Button } from 'react-native';

import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { useState } from "react";
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { RootTabScreenProps } from '../types';

export default function YearMonthSelectScreen() {
    const navigation = useNavigation(); 

    var current_year = (new Date()).getFullYear();
    var years : ItemType<string>[] = [];
    for(var i : number = current_year;i <= current_year + 10; i++)
    {
        years.push({label: i.toString(), value: i.toString()});
    }
    const [open_years, setOpenYears] = useState(false);
    const [value_years, setValueYears] = useState(current_year.toString());

    var months : ItemType<string>[] = [];
    for(var i : number = 1;i <= 12; i++)
    {
        months.push({label: i.toString(), value: i.toString()});
    }
    const [open_month, setOpenMonth] = useState(false);
    const [value_month, setValueMonth] = useState(((new Date()).getMonth() + 1).toString());

    return (
        <View style={styles.container}>
            <Text style={styles.title}>シフト表を生成する年・月を指定してください</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={styles.year_month}>
                <Text style={styles.container}>年</Text>
                <DropDownPicker
                    items={years}
                    open={open_years}
                    value={value_years}
                    setOpen={setOpenYears}
                    setValue={setValueYears}
                />
                <Text style={styles.container}>月</Text>
                <DropDownPicker
                    items={months}
                    open={open_month}
                    value={value_month}
                    setOpen={setOpenMonth}
                    setValue={setValueMonth}
                />

            </View>
            <Button title="次へ" onPress={() => {navigation.navigate('シフト生成確認', {staff:staff});}}/>
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
  year_month: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }, 

});
