import { StaffToSlots } from '../common/data_accessor';
import axios from 'axios';

const server_address : string = 'http://127.0.0.1:5000';

export function HTTPRequest_GenerateShift(
    staff_slot: StaffToSlots[], 
    required : {slot_id: string, required: number}[], 
    conditions: {enable: boolean, value:number}[] 
)
{
    console.log(staff_slot);
    console.log(required);
    console.log(conditions);

    var data = {staff_slot: staff_slot, required: required, conditions: conditions};

    axios
      .post(server_address + '/shift_generate', data)
      .then((res) => {
        console.log(res.data);
        if(res.data.result == 'ok'){
          alert('認証OK');
        }else{
          alert('認証NG');
        }
      })
      .catch(error => console.log(error));
//    navigation.navigate('シフト生成確認', {});
}
