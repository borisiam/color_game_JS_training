
// DECLARE GLOBAL VARIABLES

var colorBox = document.querySelector("#colorbox");
var goalText = document.querySelector("#goal");
var buttonContainer = document.querySelector("#button_container");
var gameOn;
var mode = "easy";

// ADD EVENT LISTENERS MANUALLY
var easyBtn = document.querySelector("#easy_btn");
var hardBtn = document.querySelector("#hard_btn");
var newGameBtn = document.querySelector("#new_colors");

easyBtn.addEventListener("click", function(){
	mode = "easy";
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected",1);
 });

hardBtn.addEventListener("click", function(){
	mode = "hard";
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected",1);
 });

newGameBtn.addEventListener("click", function(){
	resetTheGame();
 });
// DEFINING SOME FUNCTIONS

function generateColor () {
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	var color = `rgb(${r}, ${g}, ${b})`;
	return color;
};

function generateEasyColor() {
	var r = Math.round(255 /(1 +Math.floor(Math.random()*3)));
	var g = Math.round(255 /(1 +Math.floor(Math.random()*3)));
	var b = Math.round(255 /(1 +Math.floor(Math.random()*3)));
	var color = `rgb(${r}, ${g}, ${b})`;
	return color;
}

function createColorDiv () {
	//creates divs with class square
	var div = document.createElement("div");
	div.setAttribute("class","square");

	if (mode === "hard") {
		div.style.background = generateColor();
	}
	else{
		div.style.background = generateEasyColor();
	};
	
	return div;
};

function populateColorDivs () {
	while (colorBox.childElementCount < 6){
		colorBox.appendChild(createColorDiv())
	};
};

function resetTheGame () {
	// Clean up remaining colors
	while (colorBox.hasChildNodes()) {
    colorBox.removeChild(colorBox.lastChild);
	};

	// Remove the button
	while (buttonContainer.hasChildNodes()) {
    buttonContainer.removeChild(buttonContainer.lastChild);
	};

	// Remove the winner sign
	goalText.classList.remove("winner");

	populateColorDivs();
	playGame();
};

function createButton () {
	var button = document.createElement("button");
	button.innerHTML = "PLAY AGAIN";
	button.setAttribute("id","pop_btn");
	button.addEventListener("click", function () {
		resetTheGame();
	});
	return button;
};

function squaresChangeColors (clickedDiv) {
	var clickedColor = clickedDiv.style.background;
	for (var n = 0; n < colorBox.children.length; n++) {
		colorBox.children[n].style.background = clickedColor;
	};
};

function playGame () {
	// Decare local variables
	gameOn = true;
	var squares = document.querySelectorAll(".square");
	var goal = colorBox.children[Math.floor(Math.random()*6)].style.background;
	var choice;
	//Body
	goalText.textContent = goal;

	for (var i = 0; i < squares.length; i++){

		//add event listeners to squares
		squares[i].addEventListener("click", function () {

			choice = this.style.background;

			if (gameOn == true) {
				if (choice != goal) {this.style.background = "white";}
				else{
					goalText.setAttribute("class","winner");
					buttonContainer.appendChild(createButton());
					gameOn = false;
					squaresChangeColors(this);
				};
			};	
		});
	};

};

// INTITIALIZING THE GAME

populateColorDivs();
playGame();

