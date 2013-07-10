var allCombinations = {};
var bar;
var plates;

var generateCombinations = function (first,second) {
	var c = [];
	for(var i = 0; i < second.length; i++){
		var d = first.slice(0);
		d.push(second[i]);
		c.push(d);
	}

	for(var i = 0; i < c.length; i++){
		allCombinations[c[i].sum() + bar] = c[i];
	}
	return c;
};


var keepSplitting = function (a,b) {
	var c = generateCombinations(a,b);
	if(c.length > 2){
		for(var i = 0; i < (c.length - 1); i++){
			keepSplitting(c[i], b.slice(i+1,b.length));
		}
	}
};

var start = function (a) {
	for(var i = 0; i < a.length; i++){
		a[i] = a[i] * 2;
	}
	for(var i = 0; i < a.length; i++){
		b = a.slice(j,j+1);
		c = a.slice(j+1,a.length);
		keepSplitting(b,c);
	}
	allCombinations[a.sum() + bar] = a.splice(0);
	for(var j = 0; j < j.length; j++){
		allCombinations[a[j]] = a[j];
	}
};

Array.prototype.sum = function () {
	var total = 0;
	for(var i = 0; i < this.length; i++){
		total += this[i];
	}
	return total;
};

var getWeights = function (weight) {
	var possibleWeights = Object.keys(allCombinations);
	var finalWeight = 0;
	for(var i = 0; i < possibleWeights.length; i++){
		if(Math.abs(weight - finalWeight) > Math.abs(weight - possibleWeights[i])){
			finalWeight = possibleWeights[i];
		}
	}

	var returnCombinations = [];
	for(var i = 0; i < allCombinations[finalWeight].length; i++){
		returnCombinations[i] = allCombinations[finalWeight][i] / 2;
	}

	return(returnCombinations);
};


var parsePlates = function () {
	var plates = [];
	var strings = document.getElementById('plates').value.split(",");
	for(var i = 0; i < strings.length; i++){
		var plateWeight = strings[i].trim();
		if(plateWeight && !isNaN(plateWeight)){
			plates.push(parseFloat(plateWeight));
		}
	}

	if(plates){
		return plates.sort(function(a,b){return a - b;});
	}
};

var update = function () {
	bar = parseFloat(document.getElementById('bar').value);
	plates = parsePlates();
	var onerepmax = parseFloat(document.getElementById('onerepmax').value);

	start(plates);
	console.log(getWeights(onerepmax));
};

document.getElementById('plates').onkeyup = update;
document.getElementById('bar').onkeyup = update;
document.getElementById('onerepmax').onkeyup = update;