var allCombinations = {};
var generateCombinations = function (first,second) {
	var c = [];
	for(var i = 0; i < second.length; i++){
		var d = first.slice(0);
		d.push(second[i]);
		c.push(d);
	}

	console.log(c);
	console.log("");
	for(var i = 0; i < c.length; i++){
		allCombinations[c[i].sum()] = c[i];
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
}

var start = function (a) {
	for(var i = 0; i < a.length; i++){
		a[i] = a[i] * 2;
	}
	for(var i = 0; i < a.length; i++){
		b = a.slice(j,j+1);
		c = a.slice(j+1,a.length);
		keepSplitting(b,c);
	}
	allCombinations[a.sum()] = a.splice(0);
	for(var j = 0; j < j.length; j++){
		allCombinations[a[j]] = a[j];
	}
	console.log(allCombinations);
}

Array.prototype.sum = function () {
	var total = 0;
	for(var i = 0; i < this.length; i++){
		total += this[i];
	}
	return total;
}

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
}





start([44,33,22,11,5.5,2.25]);

alert(getWeights(200));