let topicsArray = [
    "第一次健康檢查！", 
    "第二次健康檢查！", 
    "第三次健康檢查！", 
    "第四次健康檢查！", 
    "第五次健康檢查！"
];

let startDate = new Date();

function setMonthAndDay(startMonth, startDay){
    startDate.setMonth(startMonth-1, startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

//setMonthAndDay(1, 2);