const slides=document.querySelectorAll('#slides .slde');
const next=document.getElementById('next');
const previous=document.getElementById('previous');
const controls=document.querySelectorAll('.controls');

let currentSlide=0;

function goToSlide(n){
    slides[currentSlide].className='slide';
    currentSlide=(n+slides.length)%slides.length;
    slides[currentSlide].className='slide showing';
}

function setupListers(){
    next.onclick=function(){
        goToSlide(currentSlide+1);
    }
    previous.onclick=function(){
        goToSlide(currentSlide+1);
    }
}

function showButtons(){
    for(var i=0; i<controls.length; i++){
        controls[i].style.display='inline-block';
    }
}

function sliderInit(){
    if (slider.length !==0) {
        setupListers();
        showButtons();
    }
}

module.exports=sliderInit;