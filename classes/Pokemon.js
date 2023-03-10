import * as lists from '../modules/arrays.js';
import * as helper from '../modules/helperFunctions.js';
import * as stats from '../modules/stats.js';
import * as api from '../modules/api.js';
import * as attacks from '../modules/attacks.js';

import { Moves } from './Moves.js';

export class Pokemon {
	setPokemon(thePokemon, typeArray, statArray, inLevel, learnableMoves, playerNumber) {
		this.number = thePokemon.id;
		this.playerNumber = playerNumber;
		this.name = thePokemon.name;
		this.type = typeArray;
		this.level = inLevel;

        this.sprite = thePokemon.sprites.front_default;

        //console.log(this.sprite)

		this.hp = stats.calculateMaxHP(statArray[0], this.level);
		this.att = stats.calcStats(statArray[1], this.level);
		this.def = stats.calcStats(statArray[2], this.level);
		this.spAtt = stats.calcStats(statArray[3], this.level);
		this.spDef = stats.calcStats(statArray[4], this.level);
		this.speed = stats.calcStats(statArray[5], this.level);

		this.currHealth = this.hp;

		this.learnableMoves = learnableMoves;

		this.learnedMoves = new Array();

		this.setDefenseType(this.type[0], this.type[1]);
	}

    getSprite()
    {
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
		api.loadMoveDataToWebPage(theMove, this, this.learnedMoves.length);
	}
}