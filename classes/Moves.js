export class Moves {
	constructor() {
		this.name = 'filler';
		this.power = 0;
		this.type = 'normal';
		this.accuracy = 0;
		this.damageClass = 'filler';
		this.critRate = 0;
	}

	setMove(inMove) {
		this.name = inMove.name;
		this.power = inMove.power;
		this.type = inMove.type.name;
		this.accuracy = inMove.accuracy;
		this.damageClass = inMove.damage_class.name;
		this.critRate = inMove.meta.crit_rate;
		//console.log(inMove)
	}

	getName() {
		return this.name;
	}

	getDamageClass() {
		return this.damageClass;
	}

	getAttackPower() {
		return this.power;
	}

	getMoveType() {
		return this.type;
	}
}