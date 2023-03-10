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
		this.name = inMove.get('name');
		this.power = inMove.get('power');
		this.type = inMove.get('type').name;
		this.accuracy = inMove.get('accuracy');
		this.damageClass = inMove.get('damage_class').name;
		this.critRate = inMove.get('meta').crit_rate;
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