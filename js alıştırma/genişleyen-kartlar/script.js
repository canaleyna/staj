/* �nce dom ile b�t�n panellere eri�elim */
const panels = document.querySelectorAll(".panel");


console.log(panels) // g�rd�m ki itemler tek tek de�il nodelist, direkt addeventlistener ekleyemiyorum,o y�zden forEach kullanmal�y�m


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
// toggle aktif ise pasife, pasif ise aktife �evirir
//panel.classList.toggle("active");