const pokemonTypesArray = [
	'normal',
	'fire',
	'water',
	'electric',
	'grass',
	'ice',
	'fighting',
	'poison',
	'ground',
	'flying',
	'psychic',
	'bug',
	'rock',
	'ghost',
	'dragon',
	'dark',
	'steel',
	'fairy'
];

const normalType_DefMult = [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1];
const fireType_DefMult = [1, 0.5, 2, 1, 0.5, 0.5, 1, 1, 2, 1, 1, 0.5, 2, 1, 1, 1, 0.5, 0.5];
const waterType_DefMult = [1, 0.5, 0.5, 2, 2, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1];
const electricType_DefMult = [1, 1, 1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 1];
const grassType_DefMult = [1, 2, 0.5, 0.5, 0.5, 2, 1, 2, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 1];
const iceType_DefMult = [1, 2, 1, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1];
const fightType_DefMult = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 0.5, 1, 1, 0.5, 1, 2];
const poisonType_DefMult = [1, 1, 1, 1, 0.5, 1, 0.5, 0.5, 2, 1, 2, 0.5, 1, 1, 1, 1, 1, 0.5];
const groundType_DefMult = [1, 1, 2, 0, 2, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1];
const flyingType_DefMult = [1, 1, 1, 2, 0.5, 2, 0.5, 1, 0, 1, 1, 0.5, 2, 1, 1, 1, 1, 1];
const psychicType_DefMult = [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 2, 1, 2, 1, 2, 1, 1];
const bugType_DefMult = [1, 2, 1, 1, 0.5, 1, 0.5, 1, 0.5, 2, 1, 1, 2, 1, 1, 1, 1, 1];
const rockType_DefMult = [0.5, 0.5, 2, 1, 2, 1, 2, 0.5, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 1];
const ghostType_DefMult = [0, 1, 1, 1, 1, 1, 0, 0.5, 1, 1, 1, 0.5, 1, 2, 1, 2, 1, 1];
const dragonType_DefMult = [1, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2];
const darkType_DefMult = [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 2, 1, 0.5, 1, 0.5, 1, 2];
const steelType_DefMult = [
	0.5, 2, 1, 1, 0.5, 0.5, 2, 0, 2, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 1, 0.5, 0.5
];
const fairyType_DefMult = [1, 1, 1, 1, 1, 1, 0.5, 2, 1, 1, 1, 0.5, 1, 1, 0, 0.5, 2, 1];

//Provided: function for matching type names with the given array [MUST HAVE CORRECTLY NAMED ARRAYS]
function getPokemonTypeDefArray(type) {
	if (type == '') {
		return '';
	} else if (type == 'normal') {
		return normalType_DefMult;
	} else if (type == 'fire') {
		return fireType_DefMult;
	} else if (type == 'water') {
		return waterType_DefMult;
	} else if (type == 'electric') {
		return electricType_DefMult;
	} else if (type == 'grass') {
		return grassType_DefMult;
	} else if (type == 'ice') {
		return iceType_DefMult;
	} else if (type == 'fighting') {
		return fightType_DefMult;
	} else if (type == 'poison') {
		return poisonType_DefMult;
	} else if (type == 'ground') {
		return groundType_DefMult;
	} else if (type == 'flying') {
		return flyingType_DefMult;
	} else if (type == 'psychic') {
		return psychicType_DefMult;
	} else if (type == 'bug') {
		return bugType_DefMult;
	} else if (type == 'rock') {
		return rockType_DefMult;
	} else if (type == 'ghost') {
		return ghostType_DefMult;
	} else if (type == 'dragon') {
		return dragonType_DefMult;
	} else if (type == 'dark') {
		return darkType_DefMult;
	} else if (type == 'steel') {
		return steelType_DefMult;
	} else if (type == 'fairy') {
		return fairyType_DefMult;
	}
}

//complete to walk through array
function getIndexFromType(type) {
	for (var i = 0; i < 18; i++) {
		if (pokemonTypesArray[i] === type) {
			return i;
		}
	}

	return 100;
}

export {
	getIndexFromType,
	getPokemonTypeDefArray,
	pokemonTypesArray,
	normalType_DefMult,
	fireType_DefMult,
	waterType_DefMult,
	electricType_DefMult,
	grassType_DefMult,
	iceType_DefMult,
	fightType_DefMult,
	poisonType_DefMult,
	groundType_DefMult,
	flyingType_DefMult,
	psychicType_DefMult,
	bugType_DefMult,
	rockType_DefMult,
	ghostType_DefMult,
	dragonType_DefMult,
	darkType_DefMult,
	steelType_DefMult,
	fairyType_DefMult
};