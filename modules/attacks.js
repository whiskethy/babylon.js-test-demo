function calcAttDam(attackingPokemon, defendingPokemon, theAttack, damageMult) {
	//https://bulbapedia.bulbagarden.net/wiki/Damage#Generation_V_onward

	var level = attackingPokemon.getLevel();
	var attackPower = theAttack.getAttackPower();
	var attackStat = 0;
	var defenseStat = 0;

	if (theAttack.getDamageClass() == 'physical') 
	{
		attackStat = attackingPokemon.getAttack();
		defenseStat = defendingPokemon.getDefense();
	} 
	else if (theAttack.getDamageClass() == 'special') 
	{
		attackStat = attackingPokemon.getSpecialAttack();
		defenseStat = defendingPokemon.getSpecialDefense();
	}

	return Math.floor(
		((((2 * level) / 5 + 2) *
			attackPower *
			(attackStat / defenseStat)) /
			50 +
			2) *
			damageMult
	);

}

export { calcAttDam };