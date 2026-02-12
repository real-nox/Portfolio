window.addEventListener("load", (ev) => {
    if (window.innerWidth <= 910) {
        addMenuPhone()
    }
})

function addMenuPhone() {
    const first = $("#nav .firstPart")[0].innerHTML
    const box = $("#nav .secondPart")[0].innerHTML
    const list = '<div class="boxC"><button style="background-color: transparent; border: 0;" class="material-symbols-outlined listbtn">menu</button></div>'
    $("#nav")[0].innerHTML = first + list

    $(".topNav").append(`<div class="navphone">${box}</div>`)
    $(".boxC").removeClass("second")
    $(".listbtn").on("click", (ev) => {
        $(".navphone").toggleClass("open")
        $(".boxC").toggleClass("show")
    })
}