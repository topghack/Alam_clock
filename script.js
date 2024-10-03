window.onload = function(){

    let setTime = document.querySelector('.setTime');
    let day = document.querySelector('.day');
    let second = document.querySelector('.second');
    let setAlarmTime = document.querySelector('.setAlarmTime');
    let setAlarm = document.querySelector('.setAlarm');
    let lcd = document.querySelector('.lcdOff');
    let music = document.getElementById('music');
    let setButton = document.querySelector('.setButton');
    let saveAlarm = document.querySelector('.saveAlarm');
    let getUserHourAlarm = document.getElementById('hour');
    let getUserMinutesAlarm = document.getElementById('minutes');
    let controlButtons = document.querySelector('.controlBtn');
    let turnOffBtn = document.getElementById('turnOffBtn');

    var lcdIsFlashing;

    let loadData = window.localStorage;
    let getUserHourAlarmTime = loadData.userHourAlarm;
    let getUserMinutesAlarmTime = loadData.userMinutesAlarm;

    let showTime = setInterval(getTime,1000);
    let playAlarm = setInterval(checkTime,1000);

    if(getUserHourAlarmTime && getUserMinutesAlarmTime){
        showAlarmTime();
    }
    
    setButton.addEventListener('click',toggleSettingBox);
    saveAlarm.addEventListener('click',saveUserAlarmTime);
    turnOffBtn.addEventListener('click',turnOffAlarm);
 
    function getTime(){

        let time = new Date();
        let getHour = time.getHours(); 
        let getMinutes = time.getMinutes();
        let getSeconds = time.getSeconds(); 
        
        if(getHour < 10){
            getHour = `0${getHour}`;
        }

        if(getMinutes < 10){
            getMinutes = `0${getMinutes}`;
        }
        
        if(getSeconds < 10){
            getSeconds = `0${getSeconds}`;
        }

        if(getHour < 12 ){
            day.innerText = 'AM';
        }else{
            day.innerText = 'PM';
        }

        setTime.innerText = `${getHour}:${getMinutes}`;
        second.innerText = getSeconds;

        localStorage.setItem('hour',getHour);
        localStorage.setItem('minutes',getMinutes);

    }

    function toggleSettingBox(e){

        let toggle = setAlarmTime.classList.toggle('setAlarmTimeShow');
        e.target.innerHTML = `&#x2BC8;` ;

        if(toggle){
            e.target.innerHTML = `&#x2BC8;` ; //&#x2BC8;
        }else{
            e.target.innerHTML = `&#11207;` ; //&#11207;
        }
    }

    function saveUserAlarmTime(){

        let userHour;
        let userMinute;

        if(Number(getUserHourAlarm.value) < 10){
            userHour = `0${getUserHourAlarm.value}`;
        }else{
            userHour = `${getUserHourAlarm.value}`;
        }

        if(Number(getUserMinutesAlarm.value) < 10){
            userMinute = `0${getUserMinutesAlarm.value}`;
        }else{
            userMinute = `${getUserMinutesAlarm.value}`;
        }

        localStorage.setItem('userHourAlarm',userHour);
        localStorage.setItem('userMinutesAlarm',userMinute);

        let setUserHour = localStorage.getItem('userHourAlarm');
        let setUserMinutes = localStorage.getItem('userMinutesAlarm');

        setAlarm.innerText = `${setUserHour}:${setUserMinutes}`;
    }

    function showAlarmTime(){
        setAlarm.innerText = `${getUserHourAlarmTime}:${getUserMinutesAlarmTime}`;
    }
    
    function checkTime(){

        let loadData = window.localStorage;
        let getUserHourAlarmTime = loadData.userHourAlarm;
        let getUserMinutesAlarmTime = loadData.userMinutesAlarm;
        let hour = loadData.hour;
        let minutes = loadData.minutes;

        if(getUserHourAlarmTime === hour && getUserMinutesAlarmTime === minutes){
            lcdLight();
            music.play();
            clearInterval(playAlarm);
            controlButtons.classList.add('showControlButtons');
        }else{
            console.log('An error occurred in the execution of the program.');
        }
    }

    function lcdLight(){

        let counter = 0;

        lcdIsFlashing = setInterval(function(){

            counter++;

            if(counter % 2 == 0){
                lcd.className = 'lcdOn';
            }else{
                lcd.className ='lcdOff';
            }
        },1000);
    }

    function turnOffAlarm(){

        clearInterval(lcdIsFlashing);
        lcd.className = 'lcdOff';
        music.pause();
        controlButtons.classList.remove('showControlButtons'); 
        controlButtons.classList.add('hideControlButtons');
        // location.reload();
    }

}