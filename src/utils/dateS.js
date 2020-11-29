/**
 * 获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
 * @return {}
 */
export default function getNowFormatDate() {
  const date = new Date();
  const seperator1 = '/';
  const seperator2 = ':';
  const month = date.getMonth() + 1;
  const strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  const hours = date.getHours();
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours;
  }
  let minutef = date.getMinutes();
  if (minutef >= 0 && minutef <= 9) {
    minutef = '0' + minutef;
  }
  // const seconds = date.getSeconds();
  // if (seconds >= 0 && seconds <= 9) {
  //   seconds = '0' + seconds;
  // }
  const currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    ' ' +
    hours +
    seperator2 +
    minutef;
  return currentdate;
}
