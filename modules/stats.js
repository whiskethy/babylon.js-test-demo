function calcMaxHP(hpStat, theLevel) {
	var IV = 31;
	var EV = 252;
	var level = theLevel;

	return ((2 * hpStat + IV + EV / 4) * level) / 100 + level + 10;
}
function calcStats(theStat, theLevel) {
	var IV = 31;
	var EV = 252;
	var level = theLevel;
	var nature = 1;

	return (((2 * theStat + IV + EV / 4) * level) / 100 + 5) * nature;
}

export {
	calcStats,
	calcMaxHP as calculateMaxHP,
};