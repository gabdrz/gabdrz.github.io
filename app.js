// var logo = document.getElementsByClassName(".logo");
var tweenLogo = gsap.to(".logo", {y:-20, paused: true});
var tweenDog = gsap.to(".dog", {y:-20, paused: true});

// logo.addEventListener("mouseenter", function(){
//     tweenLogo.play(0);
// });

// tweenLogo.play(0);

// gsap.to(".logo", {y:-20})
// gsap.to(".logo", {y:20})
// gsap.to(".dog", {y:-20})
// gsap.to(".dog", {y:20})

function onEnterLogo(x){
    tweenLogo.play(0);
}

function onLeaveLogo(x){
    tweenLogo.reverse();
}

function onEnterDog(x){
    tweenDog.play(0);
}

function onLeaveDog(x){
    tweenDog.reverse();
}
