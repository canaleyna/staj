// JavaScript source code
const sec = document.querySelector(".secs");
const min = document.querySelector(".mins");
const hours = document.querySelector(".hours");

function tiktak() {
    // anl�k saat verileri i�in
    let second = new Date().getSeconds();
    let minute = new Date().getMinutes();
    let hour = new Date().getHours();
    console.log(hour, minute, second);

    // her saniye ka� derecelik a�� ile d�nmeli. 
    sec.style.transform = `rotate(${180 + (second * 6)}deg)` //toplam 360 derece saniye 60, her saniye 6 decere kaymal�
    min.style.transform = `rotate(${180 + (minute * 6)}deg)` //dakika i�inde 6 derece kaymal�
    hours.style.transform = `rotate(${180 + (hour * 30)}deg)` //saat i�in 360/12 30 derece kaymal�
}

setInterval(tiktak, 1000); //her saniye oynas�n