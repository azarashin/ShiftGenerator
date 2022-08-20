import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const storage: Storage = new Storage({
    // 最大容量
    size: 1000,
    // バックエンドにAsyncStorageを使う
    storageBackend: AsyncStorage,
    // キャッシュ期限(null=期限なし)
    defaultExpires: null,
    // メモリにキャッシュするかどうか
    enableCache: true,
})

export function DASave_Slot(slot: string, required: number) { 
    var key = 'slot:' + slot;
    storage.save({
        key: key, 
        data: {
            required: required
        }
    });
}

export function DALoad_Slot(slot: string, callback: (ret_required: number) => void) { 
    var key = 'slot:' + slot;
    storage.load({
        key : key
      }).then((data) => {
        // 読み込み成功時処理
        callback(data.required); // --> { col1: 'hoge', col2: 100 }
      }).catch(err => {
        // 読み込み失敗時処理
        console.log('load failed.');
        callback(0);
      });
}

// 現時点でのTypeScript では連想配列のkey に列挙子を指定できないため、
// enum の実体を、enum名と同じ文字列にしている…(他に良い方法ないか？)。
export const enum WishType {
  wish = 'wish', 
  refuse = 'refuse', 
  neutral = 'neutral'
}

export declare type WishData = {
  [index: string]: WishType
}

export function DALoad_StaffWish(staff: string, date: Date, callback: (ret_wish: WishData, staff: string, date: Date) => void) : void
{
  var key = 'wish:' + staff + ':' + date.getFullYear() + ':' + (date.getMonth() + 1);
  storage.load({
      key : key
    }).then((data) => {
      // 読み込み成功時処理
      callback(data.wish, staff, date);
    }).catch(err => {
      // 読み込み失敗時処理
      console.log('load failed.');
      console.log(key); 
      callback({}, staff, date);
    });
    console.log(date); 
    console.log(key); 
}


export function DASave_StaffWish(staff: string, date: Date, target : WishData) : void
{
  var key = 'wish:' + staff + ':' + date.getFullYear() + ':' + (date.getMonth() + 1);
  storage.save({
      key: key, 
      data: {
          wish: target
      }
  });
  console.log(date); 
  console.log(key); 
}

export function DALoad_StaffList(callback: (ret_staffs: Array<string>) => void) : void
{
  callback(['鈴木 太郎', '田中 次郎', '佐藤 三郎']);
}
