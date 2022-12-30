const present_time = document.querySelector("h1");  // to get the currrent time in digital format
const alarm_selection = document.querySelector(".alarm-selection");
const select_column = document.querySelectorAll("select");
const act_AlarmBtn = document.querySelector("button");

let alarmTime, isAlarmON,
ringtone = new Audio("./Files/ringtone.mp3");

// console.log("Script is working")

for(let i=12; i>0; i--){
    i = i<10 ? `0${i}` : i;
    let option = `<option value="${i}"> ${i}</option>`;
    select_column[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>0; i--){
    i = i<10 ? `0${i}` : i;
    let option = `<option value="${i}"> ${i}</option>`;
    select_column[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    select_column[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(()=>{

// To Get the Time ( hrs, min & sec)

let date = new Date(),
h = date.getHours(),
m = date.getMinutes(),
s = date.getSeconds(),
ampm = "AM"

if(h>=12){
    h = h -12;
    ampm = "PM";
}

h = h == 0 ? h = 12 : h;   

// TO add the 0 before hrs, min and sec

h = h < 10 ? "0" + h : h;
m = m < 10 ? "0" + m : m;
s = s < 10 ? "0" + s : s;

present_time.innerText = `${h}:${m}:${s} ${ampm}`;

if(alarmTime == `${h}:${m} ${ampm}`){
    ringtone.play();
    ringtone.loop = true;
   }

});    

function actAlarm(){

    if (isAlarmON) {
        alarmTime = "";
        ringtone.pause();
        alarm_selection.classList.remove("disable"); 
        act_AlarmBtn.innerText = "Activate Alarm";
        return isAlarmON = false;
    }

// to get the hrs min and sec ampm  select tag value for Alarm set
let time = `${select_column[0].value}:${select_column[1].value} ${select_column[2].value}`
// console.log(time);

if(time.includes("Hour") || time.includes("Minute") || time.includes("AM|PM")){
    return alert("Please select a valid Alarm time !! ")
}

alarmTime = time;
console.log(alarmTime);
isAlarmON = true;

// to disable the select hrs min and AMPM after set the alarm time
alarm_selection.classList.add("disable");
act_AlarmBtn.innerText = " Deactivate Alarm ";
}

act_AlarmBtn.addEventListener("click", actAlarm);    