import { StaffToSlots } from '../common/data_accessor';
import axios from 'axios';

const server_address : string = 'http://127.0.0.1:5000';

export function HTTPRequest_GenerateShift(
    staff_slots: StaffToSlots[], 
    required : {slot_id: string, required: number}[], 
    conditions: {enable: boolean, value:number}[] 
)
{
    console.log(staff_slots);
    console.log(required);
    console.log(conditions);

    var data = {staff_slots: staff_slots, required: required, conditions: conditions};

    axios
      .post(server_address + '/shift_generate', data)
      .then((res) => {
        console.log(res.data);
        if(res.data.result == 'ok'){
          alert('実行開始しました');
        }else{
          alert('処理中です');
        }
      })
      .catch(error => console.log(error));
//    navigation.navigate('シフト生成確認', {});
}
