var div = document.querySelectorAll("div.color > div");
var reset = document.querySelectorAll("input#reset");
var arrPosicoes;
var currentClick;
var context;
var limit = 5;

function restart(){
	currentClick = 0;
	arrPosicoes = [];
	iniciaNovaSequencia();
	document.getElementById('score').innerText = '--';
};

(function() {
	context = new AudioContext();
	restart();
})();
NodeList.prototype.addEventListener = function(event, func) {
	this.forEach(function(content, item) {
		content.addEventListener(event, func);
	});
};
reset.addEventListener("click", function() {
	restart();
});

div.addEventListener("click", function() {
	if (arrPosicoes[currentClick].color == this.id){
		playSound(arrPosicoes[currentClick].color, arrPosicoes[currentClick].frequency);
		fadeIn(this);
		currentClick++;
		
		if (currentClick == arrPosicoes.length){
			if (arrPosicoes.length === limit + 1){
				alert('Você ganhou.');
				restart();
				return false;
			}

			var interval = setTimeout(function() {
				document.getElementById('score').innerText = currentClick < 10 ? '0'.concat(currentClick) : currentClick;
				iniciaNovaSequencia(this, currentClick);

				clearInterval(interval);
				currentClick = 0;
			}, 600);
		}
	}
	else
	{
		playSound(arrPosicoes[currentClick].color, 200);
		fadeIn(this);
		alert('Fim de jogo, você errou.');
		restart();
	}
});

function iniciaNovaSequencia(val, index) {
	if (val === undefined) {
		acendeLuz();
		return false;
	}
	
	if (index <= 20)
	{
		acendeLuz();

		arrPosicoes.forEach (function(i, index) {
			var interval = setTimeout(function() {
				playSound(i.color, i.frequency);
				fadeIn(document.getElementById(i.color));

				clearInterval(interval);
			}, 1400*(index+1));
		});
	}
}

function acendeLuz(currentColor, frequency) {
	var proximaLuz = Math.floor(Math.random() * 4 - 0);
	
	if (currentClick === limit + 1)
		return false;

	if (currentColor === undefined)
	{
		switch (proximaLuz) {
			case 0:
				currentColor = "green";
				frequency = 523.3;
				break;
			case 1:
				currentColor = "red";
				frequency = 622.3;
				break;
			case 2:
				currentColor = "blue";
				frequency = 740.0;
				break;
			case 3:
				currentColor = "yellow";
				frequency = 880.0;
				break;
		}
		
		playSound(currentColor, frequency);
		fadeIn(document.getElementById(currentColor));
	}
	
	var obj = {color: currentColor, frequency: frequency};
	arrPosicoes.push(obj);
}

function fadeIn(element) {
	var opacity = 1;
	var timer = setInterval(function() {
		if (opacity <= 0.5)
			clearInterval(timer);
		
		element.style.opacity = opacity;
		element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
		opacity -= opacity * 0.4;
	}, 30);

	fadeOut(element);
}

function fadeOut(element) {
	var opacity = 0.1;
	element.style.display = "block";
	
	var timer = setInterval(function() {
		if (opacity >= 1)
			clearInterval(timer);
		
		element.style.opacity = opacity;
		element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
		opacity += opacity * 0.5;
	}, 30);
}

function playSound(color, frequency) {
	var o = context.createOscillator();
	var X = 1;
	var g = context.createGain();

	o.frequency.value = frequency;
	o.connect(g);
	g.connect(context.destination);
	o.start(0);
	g.gain.exponentialRampToValueAtTime(0.0002, context.currentTime + X);
}