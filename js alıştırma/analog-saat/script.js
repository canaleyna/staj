// JavaScript source code
const sec = document.querySelector(".secs");
const min = document.querySelector(".mins");
const hours = document.querySelector(".hours");

function tiktak() {
    // anlýk saat verileri için
    let second = new Date().getSeconds();
    let minute = new Date().getMinutes();
    let hour = new Date().getHours();
    console.log(hour, minute, second);

    // her saniye kaç derecelik açý ile dönmeli. 
    sec.style.transform = `rotate(${180 + (second * 6)}deg)` //toplam 360 derece saniye 60, her saniye 6 decere kaymalý
    min.style.transform = `rotate(${180 + (minute * 6)}deg)` //dakika içinde 6 derece kaymalý
    hours.style.transform = `rotate(${180 + (hour * 30)}deg)` //saat için 360/12 30 derece kaymalý
}

setInterval(tiktak, 1000); //her saniye oynasýn