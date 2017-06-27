var div = document.querySelectorAll("div.color");
var reset = document.querySelectorAll("input#reset");
var arrPosicoes = [];
var currentClick = 0;
var context;

(function() {
	context = new AudioContext();
	acendeLuz();
})();
NodeList.prototype.addEventListener = function(event, func) {
	this.forEach(function(content, item) {
		content.addEventListener(event, func);
	});
};

reset.addEventListener("click", function() {
	currentClick = 0;
	arrPosicoes = [];
	acendeLuz();
});

div.addEventListener("click", function() {
	acendeLuz();
	currentClick++;
});

function acendeLuz() {
	var proximaLuz = Math.floor(Math.random() * 4 - 0);
	var currentColor = "";
	var frequency = 0;

	switch (proximaLuz) {
		case 0:
			currentColor = "green";
			frequency = 440.0;
			break;
		case 1:
			currentColor = "red";
			frequency = 349.2;
			break;
		case 2:
			currentColor = "blue";
			frequency = 293.7;
			break;
		case 3:
			currentColor = "yellow";
			frequency = 261.6;
			break;
	}
	
	playSound(currentColor, frequency);
	fade(document.getElementById(currentColor));
	arrPosicoes.push(proximaLuz);
}

function fade(element) {
	var opacity = 1;
	var timer = setInterval(function() {
		if (opacity <= 0.5)
			clearInterval(timer);
		
		element.style.opacity = opacity;
		element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
		opacity -= opacity * 0.4;
	}, 30);

	unfade(element);
}

function unfade(element) {
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