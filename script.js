let countdownInterval;
window.onload = function () {
    const savedTime = localStorage.getItem('countdownTarget');
    const savedRemainingTime = localStorage.getItem('remainingTime');
    const isCounting = localStorage.getItem('isCounting');

    if (savedTime && isCounting === "true") {
        const now = new Date();
        const targetDate = new Date(savedTime);
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            startCountdown(targetDate);
        } else {
            localStorage.removeItem('countdownTarget');
            localStorage.removeItem('remainingTime');
            localStorage.removeItem('isCounting');
        }
    }
};
function startCountdown(targetDate) {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("message").innerText = "Countdown Finished!";
            document.getElementById("time-display").innerHTML = "00 Days 00 Hours 00 Minutes 00 Seconds";
            localStorage.removeItem('countdownTarget');
            localStorage.removeItem('remainingTime');
            localStorage.removeItem('isCounting');
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? '0' + days : days;
            document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

            localStorage.setItem('remainingTime', timeLeft);
        }
    }, 1000);
}

document.getElementById("set-timer-btn").addEventListener("click", () => {
    const inputDate = document.getElementById("datetime-input").value;
    if (inputDate) {
        const targetDate = new Date(inputDate);
        localStorage.setItem('countdownTarget', targetDate);
        localStorage.setItem('isCounting', true);
        startCountdown(targetDate);
    } else {
        alert("Please select a valid date and time.");
    }
});

