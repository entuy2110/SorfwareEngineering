var  array = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
function readTens(so,daydu)
{
 var chuoi = "";
 var chuc = Math.floor(so/10);
 var donvi = so%10;
 if (chuc>1) {
  chuoi = " " +  array[chuc] + " mươi";
  if (donvi==1) {
   chuoi += " mốt";
  }
 } else if (chuc==1) {
  chuoi = " mười";
  if (donvi==1) {
   chuoi += " một";
  }
 } else if (daydu && donvi>0) {
  chuoi = " lẻ";
 }
 if (donvi==5 && chuc>1) {
  chuoi += " lăm";
 } else if (donvi>1||(donvi==1&&chuc==0)) {
  chuoi += " " +  array[ donvi ];
 }
 return chuoi;
}
function readBlock(so,daydu)
{
 var chuoi = "";
 var tram = Math.floor(so/100);
 var so = so%100;
 if (daydu || tram>0) {
  chuoi = " " +  array[tram] + " trăm";
  chuoi += readTens(so,true);
 } else {
  chuoi = readTens(so,false);
 }
 return chuoi;
}
function readMillions(so,daydu)
{
 var chuoi = "";
 var trieu = Math.floor(so/1000000);
 var so = so%1000000;
 if (trieu>0) {
  chuoi = readBlock(trieu,daydu) + " triệu";
  daydu = true;
 }
 var nghin = Math.floor(so/1000);
 so = so%1000;
 if (nghin>0) {
  chuoi += readBlock(nghin,daydu) + " nghìn";
  daydu = true;
 }
 if (so>0) {
  chuoi += readBlock(so,daydu);
 }
 return chuoi;
}
function readNumber(so)
{
        if (so==0) return  array[0];
 var chuoi = "", hauto = "";
 do {
  var ty = so%1000000000;
  var so = Math.floor(so/1000000000);
  if (so>0) {
   chuoi = readMillions(ty,true) + hauto + chuoi;
  } else {
   chuoi = readMillions(ty,false) + hauto + chuoi;
  }
  hauto = " tỷ";
 } while (so>0);
 return chuoi;
}

export default readNumber;