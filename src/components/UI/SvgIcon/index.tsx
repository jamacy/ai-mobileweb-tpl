import SvgIcon from './icon'

import trip_taxi from '@assets/images/svg/trip_taxi.svg'
import work_taxi from '@assets/images/svg/work_taxi.svg'
import business_taxi from '@assets/images/svg/business_taxi.svg'
import radio_on from '@assets/images/svg/radio_on.svg'
import radio_off from '@assets/images/svg/radio_off.svg'
import plus from '@assets/images/svg/plus.svg'
import un_selected from '@assets/images/svg/un_selected.svg'
import selected from '@assets/images/svg/selected.svg'
import arrow from '@assets/images/svg/arrow.svg'
import edit from '@assets/images/svg/edit.svg'
import checkbox_off from '@assets/images/svg/checkbox_off.svg'
import checkbox_on from '@assets/images/svg/checkbox_on.svg'
import mituan from '@assets/images/svg/mituan.svg'
import didi from '@assets/images/svg/didi.svg'
import location from '@assets/images/svg/location.svg'
import car from '@assets/images/svg/car.svg'
import hotel from '@assets/images/svg/hotel.svg'
import train from '@assets/images/svg/train.svg'
import plane from '@assets/images/svg/plane.svg'
import pending from '@assets/images/svg/pending.svg'
import resolved from '@assets/images/svg/resolved.svg'
import rejected from '@assets/images/svg/rejected.svg'
import reach from '@assets/images/svg/reach.svg'
import remove from '@assets/images/svg/remove.svg'
import application from '@assets/images/svg/application.svg'
import reimbursement from '@assets/images/svg/reimbursement.svg'

export const  Icons : Record<string,string> = {
  TripTaxi : trip_taxi /** iconchalvyongche */,
  WorkTaxi : work_taxi /** iconjiabanyongche */,
  BusinessTaxi : business_taxi /** iconshangwuchuhang */,
  RadioOn : radio_on /** icondanxuan1 */,
  RadioOff : radio_off /** icondanxuan */,
  Plus : plus /** icontianjia */,
  UnSelected : un_selected /** iconjindutiaoweixuanzhong */,
  Selected : selected /** iconjindutiaoxuanzhong */,
  Arrow : arrow /** iconxiayibu */,
  Edit : edit /** iconbianji */,
  CheckboxOff : checkbox_off /** iconfuxuan */,
  CheckboxOn : checkbox_on /** iconfuxuan1 */,
  Meituan : mituan /** iconmeituan */,
  Didi : didi /** icondidi */,
  Location : location /** icondingwei */,
  Car : car /** iconqiche */,
  Hotel : hotel /** iconjiudian */,
  Train : train /** iconhuoche */,
  Plane : plane, 
  Pending : pending /** iconshenpizhong */,
  Resolved : resolved /** iconshenpitongguo */,
  Rejected : rejected /** iconshenpibohui */,
  Reach : reach /** icondaoda */,
  Remove : remove /** iconshanchu */,
  Application : application /** iconchalvshenqing */,
  Reimbursement : reimbursement /** iconchalvbaoxiao */,
}

export default SvgIcon
