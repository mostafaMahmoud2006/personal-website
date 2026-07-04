let tShirts = document.getElementById('tShirts');
let TbtnL = document.getElementById("Tleft")
let TbtnR = document.getElementById("Tright")

let shoese = document.getElementById('shoese');
let SbtnL = document.getElementById("Sleft")
let SbtnR = document.getElementById("Sright")

let nav = document.querySelectorAll(".main-nav a");


nav.forEach((a) => {
    a.addEventListener('mouseenter', () => {
        document.querySelector('.mega-menu').style.height = "500px";
        document.querySelector('main').style.filter = "blur(20px)"
    })

    a.addEventListener('mouseleave', () => {
        document.querySelector('.mega-menu').style.height = "0px";
        document.querySelector('main').style.filter = "blur(0px)"
    })
})


document.querySelector('.mega-menu').addEventListener('mouseenter', function () {
    document.querySelector('.mega-menu').style.height = "500px";
    document.querySelector('main').style.filter = "blur(20px)"
})

document.querySelector('.mega-menu').addEventListener('mouseleave', function () {
    document.querySelector('.mega-menu').style.height = "0px";
    document.querySelector('main').style.filter = "blur(0px)"
})



TbtnL.addEventListener("click", function () {
    tShirts.appendChild(tShirts.children[0])
})

TbtnR.addEventListener("click", function () {
    tShirts.prepend(tShirts.children[tShirts.children.length - 1])
})


SbtnL.addEventListener("click", function () {
    shoese.appendChild(shoese.children[0])
})

SbtnR.addEventListener("click", function () {
    shoese.prepend(shoese.children[shoese.children.length - 1])
})


