// önce DOM


//ana div
const wrapper = document.querySelector(".wrapper"),
//input part
inputPart = wrapper.querySelector(".input-part"),
//geçerli bir şehir ismi giriniz
infoTxt = inputPart.querySelector(".info-txt"),
//şehir ismini yazdığımız kısım
inputField = inputPart.querySelector("input"),
//konumu almak için
locationBtn = inputPart.querySelector("button"),
//hava durumu ikonuna erişmek
weatherIcon = document.querySelector(".weather-part img"),
// geri ok tuşuna erişmek
arrowBack = document.querySelector("header i")
let api;



//geri ok tuşunu aktifleştirmek
arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active")   //hava durumunu gösterdiği div in aktifliğini kapatırsak olacaktır
})


//enter a basınca bir sonraki aşamaya geçmesi için yani şehir adı yazdık ve active hale getirdik 

inputField.addEventListener("keyup", e => {

//eğer enter a basılmışsa ve şehir ismi kısmı boş değilse, bir değeri varsa api yi döndür

    //console.log("Tusa basildi:", e.key);   tuşa basılıyor mu kontrolü
    //tarayıcı önbelleğini temizlemezsen çalışmayabilir
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
})


//konumu belirlemek için enlem ve boylam bilgilerini çekip api ye ileticez, o da bize bu enlem boylama denk gelen konumun datalarını döndürecek
//konumu belirle butonuna tıklandığında
locationBtn.addEventListener("click", () => {
//geolocationdan faydalanacağız. bu tarayıcılarda konumu bulmak için kullanılan api
//eğer tarayıcı geolocationa izin veriyorsa
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError) //anlık konumu al. başarılı başarısız olabilir
    } else {
        console.log("Tarayıcınız geolocation'ı desteklemiyor")
    }
})


function onSuccess(position) {
    console.log(position)  //enlem ve boylam bilgilerini konsola bassın
    const { latitude, longitude } = position.coords; //enlem ve boylam bilgilerini çekiyoruz weather api ye göndereceğiz

    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e756671032a33b87c371066015317dfe` //konum içeren api yi kopyaladım $ ile çektiğim verileri ilettim
    //&unit=metric fahrenayt değerini standart olan celcius a çevirirdi
    fetchData()
}


function onError(error){
    console.log(error) //konumu belirle ye izin vermezsem hata döndürecek onu konsolda göstersin
    infoTxt.innerHTML = error.message //bu hatayı ayarlamış olduğum stile uygulasın
    infoTxt.classList.add("error")  
}


//Api fonksiyonunu yazalım  yani şehirleri çekelim 
function requestApi(city) {
    //console.log(city) consola girilen şehir basılıyor mu kontrolü

    //api key ve city name url ini kopyaladık openweathermap den, city önüne $ koyuyoruz ki js den dinamik olarak çekelim, api key üretmek için sayfaya giriş yap,api key gizle
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e756671032a33b87c371066015317dfe`
    fetchData()
}


function fetchData() {

    infoTxt.innerHTML = 'Sonuçlar getiriliyor...'
    infoTxt.classList.add("pending")  //geçerli giriş yapıldıysa ise bu stil kullanılsın

    //fecth apiye get isteği gönderir
    //ikinci theni yazmadan console log ile test edebilirsin, asenkron işlem promisse döndürmeli json formatına çevirdik, object kısımdan dataları görebilirsin
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result))
}


// weather details fonk. yazalım, içerisinde şehirle ilgili dataları döndüreceğiz
function weatherDetails(info) {

    //ggeçersiz bir şehir adı girdiğimde api  bunu bulamıyor ve hata döndürüyor o hata kodunu geldiğinde kullanıcıyı uyar
    if (info.cod == '404') {
        infoTxt.innerHTML = `${inputField.value} şehir bulunamadı....`
        //infoTxt.classList.add("error") stili uygulamıyor o yüzden replace ile stilleri değişmemiz lazım
        infoTxt.classList.replace("pending", "error")
    } else { //ancak sehir bulunduysa(elle girerek ya da konumla) sonucu konsolda göster ve active classını getir . 

        const city = info.name
        const country = info.sys.country
        const { description, id } = info.weather[0]
        const { feels_like, humidity, temp } = info.main

        //hava durumu iconlarının sıcaklığa göre değişmesini api den çektiğimiz verilerin "weather[0]id" değerlerine göre güncelleyelim

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


        infoTxt.classList.remove("pending", "error") //ikisini de kaldır yeni bir sonuç gireceğim
        wrapper.classList.add("active")
        console.log(info)

    }
    

    //hava durumu iconlarının sıcaklığa göre değişmesini api den çektiğimiz verilerin "weather[0]id" değerlerine göre güncelleyelim


}

