function timer(id, deadLine) {
    
    
    function getTimeRemaining(endtime) {
        const t = Date.parse(deadLine) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor((t / 1000 % 60));

        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function zeroAdd(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
        
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = zeroAdd(t.days);
            hours.innerHTML = zeroAdd(t.hours);
            minutes.innerHTML = zeroAdd(t.minutes);
            seconds.innerHTML = zeroAdd(t.seconds);

            if (timer.t <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

export default timer;