const fs = require('fs');
const findInFiles = require('find-in-files');

// TODO 공공API에서 가지고 온 json을 rest-data.json으로 파일로 만드는 코드 필요
// 한방에 할 수 있도록


// { 연도별 : {공휴일날짜 : 공휴일이름} } 형식의 JSON파일
const rest_data_json = require("../assets/json/rest-data.json");

// 기존파일
const old_only_rest_date = require("../assets/json/only-rest-date.json");

const restDayList = old_only_rest_date.restDayList;

Object.keys(rest_data_json).forEach(year => {
  const targetYearOfList = rest_data_json[year];
  Object.keys(targetYearOfList).forEach((date) => restDayList.push(date));
});

const set = new Set(restDayList);
const uniqueRestDayList = [...set];
const finalRestDayObj = {restDayList: uniqueRestDayList};

const json = JSON.stringify(finalRestDayObj, null, 2).replace(/\\n/g, "n");
fs.writeFileSync('./src/assets/json/only-rest-date.json', json);

console.log(json);


