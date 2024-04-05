// JavaScript source code
const body = document.querySelector("body"); //arka plan� de�i�mek i�in
const button = document.querySelector("button"); //buton t�kland�g�nda
const colors = [
    "black",
    "yellow",
    "green",
    "#c7bf67",
    "#7b55cf",
    "#de4747",
    "#2963ab",
];

button.addEventListener("click", changeBackground);

let i = 0;
function changeBackground() {
    // rastgele bir renk

      /*const rastgeleSayi = Math.floor(Math.random() * colors.length);
      const secilenRenk = colors[rastgeleSayi];
      console.log(rastgeleSayi, secilenRenk);
      body.style.backgroundColor = secilenRenk;*/

    // s�rayla arkaplan rengi se�
    if (i == colors.length) i = 0 // s�ra bitti�inde ba�a d�nmesi i�in yoksa son renkte tak�l�r kal�r
    const secilenRenk = colors[i];
    i++;
    body.style.backgroundColor = secilenRenk;
     
}