Array.prototype.sum = function () {
	var total = 0;
	for (var i = 0; i < this.length; i++) {
		total += this[i];
	}
	return total;
};

var getPlates = function (weight, plateWeights, bar) {
	if (!plateWeights || plateWeights.length < 1) {
		return null;
	}
	if (weight >= (plateWeights.sum()*2 + bar)) {
		return plateWeights;
	}
	var currentPlates = plateWeights.slice(0);

	var oneSide = (weight - bar)/2;
	var lightestPlate = currentPlates[currentPlates.length - 1];

	var result = [];

	while (oneSide >= lightestPlate || currentPlates.length < 1) {
		lightestPlate = currentPlates[currentPlates.length - 1];
		var found = true;
		for (var i = 0; i < currentPlates.length; i++) {
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
	for (var i = 0; i < strings.length; i++) {
		var plateWeight = strings[i].trim();
		if (plateWeight && !isNaN(plateWeight)) {
			plates.push(parseFloat(plateWeight));
		}
	}
	if (plates) {
		return plates.sort(function(a,b){return b - a;});
	}
};

var calculatePercent = function (row, onerepmax, plates, bar) {
	var percent = document.getElementById('per' + row).value / 100;
	var rep = document.getElementById('rep' + row).value;
	var usedPlates = getPlates(onerepmax * percent, plates, bar);

	var x = document.getElementById('data').rows[row].cells;
	x[3].innerHTML=(usedPlates.sum() * 2 + bar);
	x[4].innerHTML=usedPlates;
	x[5].innerHTML=(usedPlates.sum() * 2 + bar)*rep;
};

var calculateOverallTotal = function () {
	var total = 0;
	for (var i = 1; i < 7; i++) {
		var number = parseFloat(document.getElementById('data').rows[i].cells[5].innerHTML);
		total += number;
	}
  document.getElementById('total_weight').innerHTML = total;

};

var saveState = function (bar, plates) {
	var state = "#";
	state +=  "b=" + bar;
	state += "&p=" + plates;
	state += '&pe=';
	for (var i = 1; i < 7; i++) {
		state+= document.getElementById('per' + i).value + ",";
	}
	state = state.substring(0, state.length - 1);
	state += "&r=";
	for (var i = 1; i < 7; i++) {
		state+= document.getElementById('rep' + i).value + ",";
	}
	state = state.substring(0, state.length - 1);

	window.location = state;
};

function loadState() {
	if (window.location.hash) {
		var state = window.location.hash.substring(1);
		var keyVals = state.split("&");
		for (var i = 0; i < keyVals.length; i++ ) {
			var keyVal = keyVals[i].split("=");
			if (keyVal[0]=="b" ) {
				document.getElementById("bar").value = keyVal[1];
			}
			else if (keyVal[0]=="p") {
				document.getElementById("plates").value= keyVal[1];
			}
			else if (keyVal[0]=="pe") {
				for(var j = 1; j < 7; j++){
					document.getElementById('per' + j).value = (keyVal[1].split(','))[j - 1];
				}
			}
			else if (keyVal[0]=="r") {
				for(var k = 1; k < 7; k++){
					document.getElementById('rep' + k).value = (keyVal[1].split(','))[k - 1];
				}
			}
		}
	}
}

var update = function () {
	bar = parseFloat(document.getElementById('bar').value);
	plates = parsePlates();
	var onerepmax = parseFloat(document.getElementById('onerepmax').value);

	for (var i = 1; i < 7; i++) {
		calculatePercent(i, onerepmax, plates, bar);
	}
	calculateOverallTotal();
	document.getElementById('maxout').innerHTML = getPlates(onerepmax, plates, bar);
	saveState(bar, plates);
};

document.getElementById('plates').onkeyup = update;
document.getElementById('bar').onkeyup = update;
document.getElementById('onerepmax').onkeyup = update;

document.getElementById('per1').onkeyup = update;
document.getElementById('per2').onkeyup = update;
document.getElementById('per3').onkeyup = update;
document.getElementById('per4').onkeyup = update;
document.getElementById('per5').onkeyup = update;
document.getElementById('per6').onkeyup = update;

document.getElementById('rep1').onkeyup = update;
document.getElementById('rep2').onkeyup = update;
document.getElementById('rep3').onkeyup = update;
document.getElementById('rep4').onkeyup = update;
document.getElementById('rep5').onkeyup = update;
document.getElementById('rep6').onkeyup = update;
window.onload = loadState;