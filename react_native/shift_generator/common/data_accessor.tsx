import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export declare type StaffWishInfo = {
  wish: WishData,
  staff: string, 
}

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

export const MethodList: string[] = [
  "スロットに対する想定人数と実割り当て人数の差が少ない", 
  "要望の半分以上割り当てられた従業員数が多い", // FewWorkStaff
  "すべてのスロットに従業員が割り当てられる", // 
  "応募していないスロットへの割り当てが少ない", 
];

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

export function DALoad_AllSlots(callback: (ret_required: {group: string, sub_group: string, required: number}[]) => void) { 
  DALoad_IndexedSlot(0, 0, [], callback); 

}

function DALoad_IndexedSlot(
  i : number, 
  j : number, 
  data : {group: string, sub_group: string, required: number}[], 
  callback: (ret_required: {group: string, sub_group: string, required: number}[]) => void)
  {
    if(SlotGroup.length == 0 || SlotType.length == 0)
    {
      callback([]);
      return; 
    }
    if(j >= SlotType.length)
    {
      i++; 
      j = 0; 
    }
    if(i >= SlotGroup.length)
    {
      callback(data);
      return; 
    }
    var index = i * SlotType.length + j; 
    var slot = MakeSlotIDByGroup(SlotGroup[i], SlotType[j]); 
    var key = 'slot:' + slot;
    storage.load({
        key : key
      }).then((d) => {
        // 読み込み成功時処理
        data.push({group: SlotGroup[i], sub_group: SlotType[j], required: d.required});
        DALoad_IndexedSlot(i, j+1, data, callback); 
      }).catch(err => {
        // 読み込み失敗時処理
        console.log('load failed.');
        data.push({group: SlotGroup[i], sub_group: SlotType[j], required: 0});
        DALoad_IndexedSlot(i, j+1, data, callback); 
      });
    }

export function MakeSlotIDByGroup(group : string, sub_group : string)
{
  if(group.search('\t') >= 0 || group.search('\t') >= 0)
  {
    console.error('group, sub_group must not contain \\t!');
    console.error('group=' + group);
    console.error('sub_group=' + sub_group);
  }
  return group + "\t" + sub_group; 
}

export const SlotGroup : string[] = [
  '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', 
];

function DaysInYearMonth(year: number, month: number): number
{
	return new Date(year, month, 0).getDate();
}

export function SlotGloupToSlot(year: number, month: number, source: {group: string, sub_group: string, required: number}[])
  : {slot_id: string, required: number}[]
{
  var days: number = DaysInYearMonth(year, month); 
  var ret: {slot_id: string, required: number}[] = [];
  var map: {[weekday: string]: {sub_group: string, required: number}[]} = {};
  for(var i: number = 0; i < source.length; i++)
  {
    if(!map[source[i].group])
    {
      map[source[i].group] = [];
    }
    map[source[i].group].push({sub_group: source[i].sub_group, required: source[i].required});
  }

  console.log(source);
  
  for(var day: number = 1; day <= days; day++)
  {
    var target: Date = new Date(year, month - 1, day); 
    var weekday: number = target.getDay(); 
    var target_slots: {sub_group: string, required: number}[] = map[SlotGroup[weekday]]; 
    for(var i: number = 0; i <  target_slots.length;i++)
    {
      var target_slot: {sub_group: string, required: number} = target_slots[i];
      var id = year + '\t' + month + '\t' + day + '\t' + target_slot.sub_group;
      ret.push({slot_id: id, required: target_slot.required});
    }
  }
  return ret;
}

export function MakeSlotIDByDate(year: number, month: number, day: number, sub_group: string)
{
  var id = year + '\t' + month + '\t' + day + '\t' + sub_group;
  return id; 
}

export declare type StaffToSlots = 
{
  name: string, 
  slots: string[]
}

export function AttachSlotToStaff(staff_datas: StaffWishInfo[]) : StaffToSlots[]
{
  var ret: StaffToSlots[] = [];
  for(var i: number = 0;i < staff_datas.length;i++)
  {
    var staff: StaffToSlots = {
      name: staff_datas[i].staff, 
      slots: []
    }; 
    for(var dt in staff_datas[i].wish)
    {
      var d: Date = new Date(dt); 
      var id: string = MakeSlotIDByDate(d.getFullYear(), d.getMonth() + 1, d.getDate(), staff_datas[i].wish[dt]);
      staff.slots.push(id);
    }
    ret.push(staff); 
  }
  return ret; 
}

// ★EnumWishType とWishType, WishTypeLabel の対応付けをすること(neutral はEnumWishType とWishTypeLabelにのみ必ず含める)
// CalenderScreen.tsx のCalenderScreen 関数でEnumWishType を参照している箇所がある。
// RequirementScreen.tsx のRequirementScreen 関数でEnumWishType を参照している箇所がある。
// EnumWishType またはWishType を更新した時はのCalenderScreen, RequirementScreen も修正すること。

// 現時点でのTypeScript では連想配列のkey に列挙子を指定できないため、
// enum の実体を、enum名と同じ文字列にしている…(他に良い方法ないか？)。
export const enum EnumWishType {
  wish_morning = 'wish-morning', 
  wish_afternoon = 'wish-afternoon', 
  wish_night = 'wish-night', 
  refuse = 'refuse', 
  neutral = 'neutral'
}
// neutral は選択されていない箇所なので、
// ラジオボタンの選択肢に用いるEnumWishType には含めるが、
// データを記録するための種別であるWishType には含めない。
export const SlotType : string[] = [EnumWishType.wish_morning, EnumWishType.wish_afternoon, EnumWishType.wish_night]; 
export const WishType : string[] = [...SlotType, EnumWishType.refuse]; 


export const WishTypeLabel : {[index : string] : string} = {
  'wish-morning': '[時間帯]午前～正午', 
  'wish-afternoon': '[時間帯]正午～夕方', 
  'wish-night': '[時間帯]夕方～夜', 
  'refuse': '不可', 
  'neutral': '指定なし'
}


export declare type WishData = {
  [index: string]: string
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
