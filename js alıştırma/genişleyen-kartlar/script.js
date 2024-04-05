/* önce dom ile bütün panellere eriþelim */
const panels = document.querySelectorAll(".panel");


console.log(panels) // gördüm ki itemler tek tek deðil nodelist, direkt addeventlistener ekleyemiyorum,o yüzden forEach kullanmalýyým


panels.forEach((panel) => {
    panel.addEventListener("click", () => {

        removeActive()
        panel.classList.add("active")

    })
})

function removeActive() {
    panels.forEach((panel) => {
        panel.classList.remove("active");

    })
}

// removeActive fonk yerine; toogle yapabilirdik
// toggle aktif ise pasife, pasif ise aktife çevirir
//panel.classList.toggle("active");