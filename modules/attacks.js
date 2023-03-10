function calcAttDam(attackingPokemon, defendingPokemon, theAttack, damageMult) {
	//https://bulbapedia.bulbagarden.net/wiki/Damage#Generation_V_onward

	if (theAttack.getDamageClass() == 'physical') {
		return Math.floor(
			((((2 * attackingPokemon.getLevel()) / 5 + 2) *
				theAttack.getAttackPower() *
				(attackingPokemon.getAttack() / defendingPokemon.getDefense())) /
				50 +
				2) *
				damageMult
		);
	} else if (theAttack.getDamageClass() == 'special') {
		return Math.floor(
			((((2 * attackingPokemon.getLevel()) / 5 + 2) *
				theAttack.getAttackPower() *
				(attackingPokemon.getSpecialAttack() / defendingPokemon.getSpecialDefense())) /
				50 +
				2) *
				damageMult
		);
	}
}

export { calcAttDam };