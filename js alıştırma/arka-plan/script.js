// JavaScript source code
const body = document.querySelector("body"); //arka planý deðiþmek için
const button = document.querySelector("button"); //buton týklandýgýnda
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

    // sýrayla arkaplan rengi seç
    if (i == colors.length) i = 0 // sýra bittiðinde baþa dönmesi için yoksa son renkte takýlýr kalýr
    const secilenRenk = colors[i];
    i++;
    body.style.backgroundColor = secilenRenk;
     
}