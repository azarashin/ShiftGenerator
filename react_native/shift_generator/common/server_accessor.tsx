import { StaffWishInfo } from '../common/data_accessor';
import { stringify } from 'qs';
import axios from 'axios';

const server_address : string = 'http://127.0.0.1:5000';

export function HTTPRequest_GenerateShift(
    staff_data: StaffWishInfo[], 
    required : {group: string, sub_group: string, required: number}[], 
    conditions: {enable: boolean, value:number}[] 
)
{
    console.log(staff_data);
    console.log(required);
    console.log(conditions);

    var data = {staff_data: staff_data, required: required, conditions: conditions};

    axios
      .post(server_address + '/shift_generate', stringify(data))
      .then((res) => {
        if(res.data.auth){
          alert('認証OK');
        }else{
          alert('認証NG');
        }
      })
      .catch(error => console.log(error));
//    navigation.navigate('シフト生成確認', {});
}
