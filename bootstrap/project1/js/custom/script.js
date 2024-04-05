// sayfa/dom y�klendi�inde navbar

window.addEventListener("DOMContentLoaded", event => {
    var navbarMobile = function () {
        const nCollapsible = document.body.querySelector("#mainNavbar");
        if (!nCollapsible) {
            return;
        }

        //y ekseninde a�a�� �ekilmemi�se class listinden kald�r, a�ag� kald�r�lm�ssa class� ekle
        if (window.scrollY === 0) {
            nCollapsible.classList.remove("navbar-mobile");
        } else {
            nCollapsible.classList.add("navbar-mobile");
        }
    };
    navbarMobile();
    document.addEventListener("scroll", navbarMobile);


    //canvas kapatma, �nce t�m linkleri liste olarak alal�m ve tek tek gezelim map de olabilirdi.
    //sonra zorla kapatma butonuna t�klatal�m
    var BtnCanvas = document.querySelectorAll(".btn-close-canvas");
    for (let i = 0; i < BtnCanvas.length; i++) {
        BtnCanvas[i].addEventListener("click", function () {
            document.querySelector('[data-bs-dismiss="offcanvas"]').click();
        });
    }


    //gerek yok
    /*const myNavbar = document.body.querySelector("#mainNavbar");
    if (myNavbar) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#mainNavbar",
            offset: 74,
        });
    }*/



});
