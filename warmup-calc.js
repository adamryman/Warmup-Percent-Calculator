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

	for(var i = 1; i < 7; i++){
		calculatePercent(i, onerepmax, plates, bar);
	}

	document.getElementById('maxout').innerHTML = getPlates(onerepmax, plates, bar);

};

var calculatePercent = function (row, onerepmax, plates, bar) {
	var percent = document.getElementById('per' + row).value / 100;
	var rep = document.getElementById('rep' + row).value;
	var usedPlates = getPlates(onerepmax * percent, plates, bar);

	var x=document.getElementById('data').rows[row].cells;
	x[3].innerHTML=(usedPlates.sum() * 2 + bar);
	x[4].innerHTML=usedPlates;
	x[5].innerHTML=(usedPlates.sum() * 2 + bar)*rep;
}

document.getElementById('plates').onkeyup = update;
document.getElementById('bar').onkeyup = update;
document.getElementById('onerepmax').onkeyup = update;

document.getElementById('per1').onkeyup = update;
document.getElementById('per2').onkeyup = update;
document.getElementById('per3').onkeyup = update;
document.getElementById('per4').onkeyup = update;
document.getElementById('per5').onkeyup = update;
document.getElementById('per6').onkeyup = update;