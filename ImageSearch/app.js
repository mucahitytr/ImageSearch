const formWrapper= document.querySelector(".form-wrapper")
const buttonwrapper = document.querySelector(".button-wrapper")
const İmageListWrapper = document.querySelector(".image")
const form= document.querySelector(".form")
const SearchInput = document.getElementById("search")
const AramaButonu = document.getElementById("ara")
const TemizleButonu = document.getElementById("temizle")

runEventsListeners();
function runEventsListeners(){
    form.addEventListener("submit",search); // arama butonu formun içerisinde yani butona işlem yaptırmak için formu seçiceksin.
    TemizleButonu.addEventListener("click",clear);
}
function clear(){
    SearchInput.value="";
    İmageListWrapper.innerHTML="";
function clearToNewSearch(){
    Array.from(İmageListWrapper.forEach((child)=>{
        child.remove();
    }))
}
}

function search(e){ 
    const SearchValue= SearchInput.value.trim();// arama sonucu . trim ile sağ sol boşluklar kesildi
    
    fetch(`https://api.unsplash.com/search/photos?query=${SearchValue}`,{ //fetchin ikinci parametresi süslü parantez açıp buraya geçiyosun
        method:"GET", // method istek tipini alır.
        headers:{ // token buraya geliyor.
            Authorization: "Client-ID vJg6NGNDSSkjLlcLAbI2UhcRuPOSZ-xXuY319p1GlvU" // kimlik ıd buraya gelir.
        }
    })
    .then((res)=>res.json()) // klasik promisi yakalama
    .then((data)=>{

             Array.from(data.results).forEach((image)=>{
                //  console.log(image.urls.small) // then ile yakaladım burada promiseden gelen veriyi arraye çevirdim
                // bu yukarıdaki results buradaki urls ve smalli consolea yazdırıp içine hakarak buluyorum ezber iş yok
              addImageToUı(image.urls.small)
            
  })
        })
    
    .catch((err)=>console.log(err))
    e.preventDefault();
    clear();
// clearToNewSearch();
}

function addImageToUı(url){//? resimleri yukarıdan alıp her birini div içerisinde tutacak
    const div = document.createElement("div"); // div oluşturur
    div.className="card" // "card" classı verir
    const img= document.createElement("img"); // div içerisinde image oluşturur
    img.setAttribute("src",url); // image içerisine src yani link verilen kısma gelen url'i atar
    img.height="400"; // yükseklik ayarı
    img.width="400"; // genişlik ayarı
    div.appendChild(img); // her oluşan divin içine imageleri koyacak.
    İmageListWrapper.appendChild(div) // genel resim tutan divime de bu oluşan divleri koyacak
    


}