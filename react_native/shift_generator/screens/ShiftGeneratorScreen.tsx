import { StyleSheet, Button } from 'react-native';

import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';

import { useState } from "react";
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { DALoad_StaffList, DALoad_StaffWish, WishData, WishType, WishTypeLabel } from '../common/data_accessor';

declare type StaffWishInfo = {
    wish: WishData,
    staff: string, 
    date: Date
}

export default function ShiftGeneratorScreen() {
    const navigation = useNavigation(); 
    const route = useRoute();

    var year = route.params.year;
    var month = route.params.month;

    const [init, setInit] = useState(false);
    const [count, setCount] = useState(0);
    const [table, setTable] = useState({data: new Array<Array<string>>(0)});
    const [staff_data, setStaffData] = useState(new Array<StaffWishInfo>(0));
    
    if(!init)
    {
        DALoad_StaffList((ret_staffs: Array<string>) => {
            var empty_table = {data: new Array<Array<string>>(ret_staffs.length)}; 
            setTable((s) => empty_table); 
            for(var i in ret_staffs)
            {
                var staff = ret_staffs[i]; 
                DALoad_StaffWish(staff, new Date(year, month - 1, 1), (ret_wish: WishData, ret_staff: string, ret_date: Date) => {
                    var tmp_table = {...table};
                    var wish_count : {[index: string]: number} = {}; 
                    for(var i : number = 0; i < WishType.length; i++)
                    {
                        wish_count[WishType[i]] = 0;
                    }
                    var wish : number = 0;
                    var refuse : number = 0;
                    for(var id in ret_wish)
                    {
                        var wish_type : string = ret_wish[id];
                        wish_count[wish_type] += 1;
                    }
                    var index : number = ret_staffs.indexOf(ret_staff); 
                    tmp_table.data[index] = new Array<string>(WishType.length + 1);
                    tmp_table.data[index][0] = ret_staff;
                    for(var i : number = 0; i < WishType.length; i++)
                    {
                        tmp_table.data[index][i + 1] = wish_count[WishType[i]].toString();
                    }
                    setTable(tmp_table); 

                    setCount((c) => c+1); 
                    var new_staff_data = {
                        wish: ret_wish, 
                        staff: ret_staff, 
                        date: ret_date
                    }; 
                    setStaffData((s) => [...s, new_staff_data]); 
                }); 
            }

        });
        setInit(true); 
    }

    var tableHead : string[] =  ['従業員氏名']; 
    for(var i : number = 0; i < WishType.length; i++)
    {
        tableHead.push(WishTypeLabel[WishType[i]])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>希望内訳を確認してください</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={table.data} textStyle={styles.text}/>
            </Table>
            <Next count={count} max={table.data.length} staff_data={staff_data} navigation={navigation}/>
        </View>
    );
}

function GenerateShift(staff_data: StaffWishInfo[], navigation: { navigate: (arg0: string, arg1: {}) => void; })
{
    console.log(staff_data);   
//    navigation.navigate('シフト生成確認', {});
}

function Next(props: { count: number; max: number; staff_data: StaffWishInfo[]; navigation: { navigate: (arg0: string, arg1: {}) => void; }; })
{
    if(props.count > 0 && props.max > 0 && props.count == props.max)
    {
        return <Button title="シフト表を自動生成する" onPress={() => {GenerateShift(props.staff_data, props.navigation);}}/>;
    }
    return <></>

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
  head: {
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  text: {
    margin: 6 
  }

});
