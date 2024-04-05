// �nce DOM


//ana div
const wrapper = document.querySelector(".wrapper"),
//input part
inputPart = wrapper.querySelector(".input-part"),
//ge�erli bir �ehir ismi giriniz
infoTxt = inputPart.querySelector(".info-txt"),
//�ehir ismini yazd���m�z k�s�m
inputField = inputPart.querySelector("input"),
//konumu almak i�in
locationBtn = inputPart.querySelector("button"),
//hava durumu ikonuna eri�mek
weatherIcon = document.querySelector(".weather-part img"),
// geri ok tu�una eri�mek
arrowBack = document.querySelector("header i")
let api;



//geri ok tu�unu aktifle�tirmek
arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active")   //hava durumunu g�sterdi�i div in aktifli�ini kapat�rsak olacakt�r
})


//enter a bas�nca bir sonraki a�amaya ge�mesi i�in yani �ehir ad� yazd�k ve active hale getirdik 

inputField.addEventListener("keyup", e => {

//e�er enter a bas�lm��sa ve �ehir ismi k�sm� bo� de�ilse, bir de�eri varsa api yi d�nd�r

    //console.log("Tusa basildi:", e.key);   tu�a bas�l�yor mu kontrol�
    //taray�c� �nbelle�ini temizlemezsen �al��mayabilir
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
})


//konumu belirlemek i�in enlem ve boylam bilgilerini �ekip api ye ileticez, o da bize bu enlem boylama denk gelen konumun datalar�n� d�nd�recek
//konumu belirle butonuna t�kland���nda
locationBtn.addEventListener("click", () => {
//geolocationdan faydalanaca��z. bu taray�c�larda konumu bulmak i�in kullan�lan api
//e�er taray�c� geolocationa izin veriyorsa
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError) //anl�k konumu al. ba�ar�l� ba�ar�s�z olabilir
    } else {
        console.log("Taray�c�n�z geolocation'� desteklemiyor")
    }
})


function onSuccess(position) {
    console.log(position)  //enlem ve boylam bilgilerini konsola bass�n
    const { latitude, longitude } = position.coords; //enlem ve boylam bilgilerini �ekiyoruz weather api ye g�nderece�iz

    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e756671032a33b87c371066015317dfe` //konum i�eren api yi kopyalad�m $ ile �ekti�im verileri ilettim
    //&unit=metric fahrenayt de�erini standart olan celcius a �evirirdi
    fetchData()
}


function onError(error){
    console.log(error) //konumu belirle ye izin vermezsem hata d�nd�recek onu konsolda g�stersin
    infoTxt.innerHTML = error.message //bu hatay� ayarlam�� oldu�um stile uygulas�n
    infoTxt.classList.add("error")  
}


//Api fonksiyonunu yazal�m  yani �ehirleri �ekelim 
function requestApi(city) {
    //console.log(city) consola girilen �ehir bas�l�yor mu kontrol�

    //api key ve city name url ini kopyalad�k openweathermap den, city �n�ne $ koyuyoruz ki js den dinamik olarak �ekelim, api key �retmek i�in sayfaya giri� yap,api key gizle
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e756671032a33b87c371066015317dfe`
    fetchData()
}


function fetchData() {

    infoTxt.innerHTML = 'Sonu�lar getiriliyor...'
    infoTxt.classList.add("pending")  //ge�erli giri� yap�ld�ysa ise bu stil kullan�ls�n

    //fecth apiye get iste�i g�nderir
    //ikinci theni yazmadan console log ile test edebilirsin, asenkron i�lem promisse d�nd�rmeli json format�na �evirdik, object k�s�mdan datalar� g�rebilirsin
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result))
}


// weather details fonk. yazal�m, i�erisinde �ehirle ilgili datalar� d�nd�rece�iz
function weatherDetails(info) {

    //gge�ersiz bir �ehir ad� girdi�imde api  bunu bulam�yor ve hata d�nd�r�yor o hata kodunu geldi�inde kullan�c�y� uyar
    if (info.cod == '404') {
        infoTxt.innerHTML = `${inputField.value} �ehir bulunamad�....`
        //infoTxt.classList.add("error") stili uygulam�yor o y�zden replace ile stilleri de�i�memiz laz�m
        infoTxt.classList.replace("pending", "error")
    } else { //ancak sehir bulunduysa(elle girerek ya da konumla) sonucu konsolda g�ster ve active class�n� getir . 

        const city = info.name
        const country = info.sys.country
        const { description, id } = info.weather[0]
        const { feels_like, humidity, temp } = info.main

        //hava durumu iconlar�n�n s�cakl��a g�re de�i�mesini api den �ekti�imiz verilerin "weather[0]id" de�erlerine g�re g�ncelleyelim

        if (id == 800) {
            weatherIcon.src = "icons/clear.svg"
        } else if (id => 200 && id <= 232) {
            weatherIcon.src = "icons/storm.svg"
        } else if ((id => 300 && id <= 321) || (id => 500 && id <= 531)) {
            weatherIcon.src = "icons/rain.svg"
        } else if (id => 600 && id <= 622) {
            weatherIcon.src = "icons/snow.svg"
        } else if (id => 701 && id <= 781) {
            weatherIcon.src = "icons/haze.svg"
        } else if (id => 801 && id <= 804) {
            weatherIcon.src = "icons/cloud.svg"
        }

        wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp)
        wrapper.querySelector(".weather").innerHTML = description
        wrapper.querySelector(".location").innerHTML = `${city},${country}`
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerHTML = humidity


        infoTxt.classList.remove("pending", "error") //ikisini de kald�r yeni bir sonu� girece�im
        wrapper.classList.add("active")
        console.log(info)

    }
    

    //hava durumu iconlar�n�n s�cakl��a g�re de�i�mesini api den �ekti�imiz verilerin "weather[0]id" de�erlerine g�re g�ncelleyelim


}

