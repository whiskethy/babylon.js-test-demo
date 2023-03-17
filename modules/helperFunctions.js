//Provided: function to easily put text into Battle Log on the website
function addToBattleLog(string, bold = false) {
	// var battleLogHook = document.getElementById('Combat_Log_List');

	// if (bold == true) {
	// 	var htmlString = `<li><strong>${string}</strong></l1> </ul>`;
	// } else {
	// 	var htmlString = `<li>${string}</l1> </ul>`;
	// }

	// battleLogHook.innerHTML = battleLogHook.innerHTML + htmlString;

	console.log(string);
}

function getTypeEffString(mult) {
	if (mult >= 2) {
		return "It's super effective!";
	} else if (mult == 0) {
		return 'It has no effect...';
	} else if (mult < 1) {
		return "It's not very effective...";
	} else if (mult == 1) {
		return '';
	} else {
		return 'ERROR';
	}
}

function getFasterPoke(Player1Pokemon, Player2Pokemon) {
	if (Player1Pokemon.getSpeed() >= Player2Pokemon.getSpeed()) {
		addToBattleLog(
			Player1Pokemon.getName() + ' goes first! They have a speed of ' + Player1Pokemon.getSpeed()
		);
		addToBattleLog(Player2Pokemon.getName() + ' has a speed of ' + Player2Pokemon.getSpeed());
		return 1;
	} else {
		addToBattleLog(
			Player2Pokemon.getName() + ' goes first! They have a speed of ' + Player2Pokemon.getSpeed()
		);
		addToBattleLog(Player1Pokemon.getName() + ' has a speed of ' + Player1Pokemon.getSpeed());
		return 2;
	}
}

function choosePoke(howToChoose) {
	//random or ask or theNum
	if (howToChoose == 'random') {
		return Math.floor(Math.random() * 904);
	} else if (howToChoose == 'ask') {
		return prompt('What is the number of the Pokemon you want to use (1-905)?');
	} else {
		return howToChoose;
	}
}

const player1HealthWebHook = document.getElementById('Player1Health');
const player2HealthWebHook = document.getElementById('Player2Health');

function updateHealthBar(target, amount) {
	if (target == 1) {
		//player1HealthWebHook.value = amount;
	} else if (target == 2) {
		//player2HealthWebHook.value = amount;
	}
}

export {
	addToBattleLog,
	getTypeEffString as getTypeEffectivenessString,
	getFasterPoke as whoGoesFirst,
	choosePoke as choosePokemon,
	updateHealthBar
};