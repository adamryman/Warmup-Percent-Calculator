var bar;
var plates;

Array.prototype.sum = function () {
	var total = 0;
	for(var i = 0; i < this.length; i++){
		total += this[i];
	}
	return total;
};

var getPlates = function (weight, plateWeights, bar) {
	if (!plateWeights || plateWeights.length < 1) {
		return null;
	}
	if (weight >= (plateWeights.sum()*2 + bar)){
		return plateWeights;
	}
	var currentPlates = plateWeights.slice(0);

	var oneSide = (weight - bar)/2;
	var lightestPlate = currentPlates[currentPlates.length - 1];

	var result = [];

	while (oneSide >= lightestPlate || currentPlates.length < 1) {
		lightestPlate = currentPlates[currentPlates.length - 1];
		var found = true;
		for (var i = 0; i < currentPlates.length; i++){
			var plate = currentPlates[i];
			if (oneSide-plate >= 0) {
				currentPlates.splice(currentPlates.indexOf(plate), 1);
				result.push(plate);
				oneSide = oneSide - plate;
				found = true;
				break;
			}
		}
		if (!found) {
			return null;
		}
	}
	return result;
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
		return plates.sort(function(a,b){return b - a;});
	}
};

var update = function () {
	bar = parseFloat(document.getElementById('bar').value);
	plates = parsePlates();
	var onerepmax = parseFloat(document.getElementById('onerepmax').value);
	document.getElementById('per1out').innerHTML = getPlates(onerepmax, plates, bar);
	console.log(getPlates(onerepmax, plates, bar));

};

document.getElementById('plates').onkeyup = update;
document.getElementById('bar').onkeyup = update;
document.getElementById('onerepmax').onkeyup = update;