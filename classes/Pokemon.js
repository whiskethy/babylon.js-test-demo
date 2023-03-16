import * as lists from '../modules/arrays.js';
import * as helper from '../modules/helperFunctions.js';
import * as stats from '../modules/stats.js';
import * as api from '../modules/api.js';
import * as attacks from '../modules/attacks.js';

import { Moves } from './Moves.js';

export class Pokemon {
	// CONSTRUCTOR
	constructor() {
		this.number = 0;
		this.name = 'filler';
		this.level = 0;
		this.playerNumber = 0;
	}

	setPokemon(pokemonData, inLevel, playerNumber) {
		this.number = pokemonData.id;
		this.name = pokemonData.name;
		this.level = inLevel;
		this.playerNumber = playerNumber;

		this.type = this.setTypeArray(pokemonData);

		this.sprite = pokemonData.sprites.front_default;

		this.hp = stats.calculateMaxHP(pokemonData.stats[0].base_stat, this.level);
		this.att = stats.calcStats(pokemonData.stats[1].base_stat, this.level);
		this.def = stats.calcStats(pokemonData.stats[2].base_stat, this.level);
		this.spAtt = stats.calcStats(pokemonData.stats[3].base_stat, this.level);
		this.spDef = stats.calcStats(pokemonData.stats[4].base_stat, this.level);
		this.speed = stats.calcStats(pokemonData.stats[5].base_stat, this.level);

		this.currHealth = this.hp;

		this.setDefenseType(this.type[0], this.type[1]);

		this.learnableMoves = this.setLearnableMovesArray(pokemonData);

		this.learnedMoves = new Array();
	}

	setTypeArray(pokemonData) {
		const typeStr = pokemonData.types.map((type) => type.type.name).join(',');
		return typeStr.split(',');
	}

	setLearnableMovesArray(pokemonData) {
		const learnableMoves = pokemonData.moves.map((moves) => moves.move.name).join(',');
		return learnableMoves.split(',');
	}

	isMoveLearnable(move) {
		if (this.learnableMoves.includes(move)) {
			return true;
		} else {
			return false;
		}
	}

	getSprite() {
		return this.sprite;
	}

	//GETTERS
	getName() {
		return this.name;
	}
	getPlayerNumber() {
		return this.playerNumber;
	}
	getLevel() {
		return this.level;
	}
	getID() {
		return this.number;
	}
	getType1() {
		return this.type[0];
	}
	getType2() {
		if (this.type[1]) {
			return this.type[1];
		} else {
			return '';
		}
	}
	getMaxHP() {
		return this.hp;
	}
	getCurrHealth() {
		return this.currHealth;
	}
	getAttack() {
		return this.att;
	}
	getDefense() {
		return this.def;
	}
	getSpecialAttack() {
		return this.spAtt;
	}
	getSpecialDefense() {
		return this.spDef;
	}
	getSpeed() {
		return this.speed;
	}

	setDefenseType(type1, type2 = '') {
		//extra steps to do something simple, but we will
		//need to add more later
		var temp = [];

		var type1Def = lists.getPokemonTypeDefArray(type1);
		var type2Def = lists.getPokemonTypeDefArray(type2);

		if (type2Def != '') {
			for (var i = 0; i < 18; i++) {
				temp[i] = type1Def[i] * type2Def[i];
			}
		} else {
			temp = type1Def;
		}

		this.typeDefArray = temp;
	}

	attack(target, attackIndex) {
		var theAttack = this.learnedMoves[attackIndex];

		if (theAttack.getDamageClass() == 'physical' || theAttack.getDamageClass() == 'special') {
			var attackTypeIndex = lists.getIndexFromType(theAttack.getMoveType());

			var damageMultiplierFromType = target.typeDefArray[attackTypeIndex];

			var damage = attacks.calcAttDam(this, target, theAttack, damageMultiplierFromType);

			var effectiveString = helper.getTypeEffectivenessString(damageMultiplierFromType);

			helper.addToBattleLog(
				this.getName() + ' uses ' + theAttack.getName() + ' for ' + damage + '. ' + effectiveString
			);

			target.takeDamage(damage);
		} else if (theAttack.getDamageClass() == 'status') {
			console.log('status attack');
			helper.addToBattleLog(this.getName() + ' uses ' + theAttack.getName() + ' but it misses ');
		}
	}

	takeDamage(damage) {
		this.currHealth -= damage;
		helper.updateHealthBar(this.playerNumber, this.currHealth);
		helper.addToBattleLog(this.getCurrHealthText());
		if (this.currHealth <= 0) {
			this.faint();
		}
	}

	getCurrHealthText() {
		return this.name + ' has ' + this.currHealth + ' HP left';
	}

	faint() {
		helper.addToBattleLog(this.name + ' has lost their health. They have fainted...', true);
	}

	setMove(inMove) {
		var theMove = new Moves();

		// set the move object with values from the map
		theMove.setMove(inMove);

		// adding data to learnedMoves
		this.learnedMoves.push(theMove);

		// call the function that loads data to buttons on page
		//api.loadMoveDataToWebPage(theMove, this, this.learnedMoves.length);
	}
}
