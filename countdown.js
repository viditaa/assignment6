function calculateRemainingTime(endTime) {
    const now = new Date().getTime();
    const timeDifference = endTime - now;
    if (timeDifference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

function updateDisplay(time) {
    document.getElementById('time').textContent = `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
}

function notifyCompletion() {
    document.getElementById('time').textContent = "Countdown Complete!";
    alert("Countdown Complete!");
}

function startCountdown(endTime) {
    const interval = setInterval(() => {
        const remainingTime = calculateRemainingTime(endTime);

        if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
            clearInterval(interval);
            notifyCompletion();
        } else {
            updateDisplay(remainingTime);
        }
    }, 1000);
}

function initializeCountdown() {
    let endTime = localStorage.getItem('countdownEndTime');
    
    if (!endTime) {
        endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('countdownEndTime', endTime);
    }

    return parseInt(endTime);
}

function resetCountdown() {
    localStorage.removeItem('countdownEndTime');
    location.reload();
}


document.getElementById('reset').addEventListener('click', resetCountdown);

const countdownEndTime = initializeCountdown();
startCountdown(countdownEndTime);