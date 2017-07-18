
// DECLARE GLOBAL VARIABLES

var colorBox = document.querySelector("#colorbox");
var goalText = document.querySelector("#goal");
var buttonContainer = document.querySelector("#button_container");
var gameOn;

// DEFINING SOME FUNCTIONS

function generateColor () {
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	var color = `rgb(${r}, ${g}, ${b})`;
	return color;
};

function createColorDiv () {
	//creates divs with class square
	var div = document.createElement("div");
	div.setAttribute("class","square");
	div.style.background = generateColor();
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
	button.addEventListener("click", function () {
		resetTheGame();
	});
	return button;
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
				if (choice != goal) {colorBox.removeChild(this);}
				else{
					goalText.setAttribute("class","winner");
					buttonContainer.appendChild(createButton());
					gameOn = false;
				};
			};	
		});
	};

};

// INTITIALIZING THE GAME

populateColorDivs();
playGame();

