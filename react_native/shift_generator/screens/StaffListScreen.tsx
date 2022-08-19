import { StyleSheet, Text, View, FlatList , Button } from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function StaffListScreen() {

    const navigation = useNavigation(); 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>従業員を選択してください</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <FlatList
                data = {['鈴木 太郎', '田中 次郎', '佐藤 三郎']}
                renderItem={({ item }) =>
                    <View style={styles.textView}>
                        <Button title={item} onPress={() => {navigation.navigate('従業員メニュー', {staff:item});}}/>
                    </View>
                }
                keyExtractor={item => item}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
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
  textView: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
});
