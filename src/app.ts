// let arrPosicoes;
// let currentClick;
// let context;
// const limit = 5;

// (function start() {
//   context = new AudioContext();
//   restart();
// })();

// function restart() {
//   currentClick = 0;
//   arrPosicoes = [];
//   iniciaNovaSequencia();
//   document.getElementById('score')!.innerText = '--';
// }

// // const dom: HTMLElement = document.getElementsByTagName('body');
// // dom.addEventListener = ((event, func) => {
// //   func.forEach((content, item) => {
// //     content.addEventListener(event, func);
// //   });
// // });

// const startButton: NodeListOf<HTMLElement> = document.querySelectorAll("input#start");
// startButton.forEach((button) => button.addEventListener("click", () => {
//   restart();
// }));

// const currentDiv: NodeListOf<HTMLElement> = document.querySelectorAll("div.color > div");
// currentDiv.forEach((div) => div.addEventListener("click", (): void => {
//   if (arrPosicoes[currentClick].color === div.id) {
//     playSound(arrPosicoes[currentClick].color, arrPosicoes[currentClick].frequency);
//     fadeIn(currentDiv);
//     currentClick++;

//     if (currentClick === arrPosicoes.length) {
//       if (arrPosicoes.length === limit + 1) {
//         alert('Você ganhou.');
//         restart();
//         return;
//       }

//       const interval = setTimeout(() => {
//         document.getElementById('score')!.innerText = currentClick < 10 ? '0'.concat(currentClick) : currentClick;
//         iniciaNovaSequencia(currentDiv, currentClick);

//         clearInterval(interval);
//         currentClick = 0;
//       }, 600);
//     }
//   }
//   else {
//     playSound(arrPosicoes[currentClick].color, 200);
//     fadeIn(currentDiv);
//     alert('Fim de jogo, você errou.');
//     restart();
//   }
// }));

// function iniciaNovaSequencia(val?, index?): void {
//   if (val === undefined) {
//     acendeLuz();
//     return;
//   }

//   if (index <= 20) {
//     acendeLuz();

//     arrPosicoes.forEach((i, index) => {
//       const interval = setTimeout(() => {
//         playSound(i.color, i.frequency);
//         fadeIn(document.getElementById(i.color));

//         clearInterval(interval);
//       }, 1400 * (index + 1));
//     });
//   }
// }

// function acendeLuz(currentColor?, frequency?): void {
//   const proximaLuz = Math.floor(Math.random() * 4 - 0);

//   if (currentClick === limit + 1) {
//     return;
//   }

//   if (currentColor === undefined) {
//     switch (proximaLuz) {
//       case 0:
//         currentColor = "green";
//         frequency = 523.3;
//         break;
//       case 1:
//         currentColor = "red";
//         frequency = 622.3;
//         break;
//       case 2:
//         currentColor = "blue";
//         frequency = 740.0;
//         break;
//       case 3:
//         currentColor = "yellow";
//         frequency = 880.0;
//         break;
//       default:
//         return;
//     }

//     playSound(currentColor, frequency);
//     fadeIn(document.getElementById(currentColor));
//   }

//   const obj = { color: currentColor, frequency };
//   arrPosicoes.push(obj);
// }

// function fadeIn(element) {
//   let opacity = 1;
//   const timer = setInterval(() => {
//     if (opacity <= 0.5) {
//       clearInterval(timer);
//     }

//     element.style.opacity = opacity;
//     element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
//     opacity -= opacity * 0.4;
//   }, 30);

//   fadeOut(element);
// }

// function fadeOut(element) {
//   let opacity = 0.1;
//   element.style.display = "block";

//   const timer = setInterval(() => {
//     if (opacity >= 1) {
//       clearInterval(timer);
//     }

//     element.style.opacity = opacity;
//     element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
//     opacity += opacity * 0.5;
//   }, 30);
// }

// function playSound(color, frequency) {
//   const o = context.createOscillator();
//   const X = 1;
//   const g = context.createGain();

//   o.frequency.value = frequency;
//   o.connect(g);
//   g.connect(context.destination);
//   o.start(0);
//   g.gain.exponentialRampToValueAtTime(0.0002, context.currentTime + X);
// }

pug.renderFile("../src/templates/index.pug");
