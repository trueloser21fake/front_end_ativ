const slides = document.querySelectorAll('.slide');
const btnAnterior = document.getElementById('botao-anterior');
const btnProximo = document.getElementById('botao-proximo');

let slideAtual = 0;

function ocultarSlides() {
  slides.forEach(item => item.classList.remove('on'))
}

function exibirSlide() {
  slides[slideAtual].classList.add('on')
}

function proximoSlide() {
  ocultarSlides()
  if(slideAtual === slides.length -1) {
    slideAtual = 0
  } else {
    slideAtual++
  }
  exibirSlide()
}

function slideAnterior() {
  ocultarSlides()
  if(slideAtual === 0) {
    slideAtual = slides.length -1
  } else {
    slideAtual--
  }
  exibirSlide()
}

btnProximo.addEventListener('click', proximoSlide)
btnAnterior.addEventListener('click', slideAnterior)
