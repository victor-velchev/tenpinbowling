const MAX_PINS_DOWN = '10';
var computeScore = function (frame, frames) {
	var runningScore = 0;
	if (frame.throw_one_a === MAX_PINS_DOWN) {
		console.log('strike!');
		runningScore += parseInt(frame.throw_one_a);
		if (parseInt(frame.number) < 9) {
			var plusOneIndex = (parseInt(frame.number) + 1).toString();
			var framePlusOne = frames.find(item => item.number === plusOneIndex);
			var plusOneIndex = (parseInt(frame.number) + 2).toString();
			var framePlusTwo = frames.find(item => item.number === plusOneIndex);
			if (framePlusOne.throw_one_a === MAX_PINS_DOWN) {
				runningScore += parseInt(framePlusOne.throw_one_a);
				runningScore += parseInt(framePlusTwo.throw_one_a);
			} else {
				runningScore += parseInt(framePlusOne.throw_one_a);
				runningScore += parseInt(framePlusOne.throw_one_b);
			}
		} else if (parseInt(frame.number) === 9) {
			var plusOneIndex = (parseInt(frame.number) + 1).toString();
			var framePlusOne = frames.find(item => item.number === plusOneIndex);
			if (framePlusOne.throw_one_a === MAX_PINS_DOWN) {
				runningScore += parseInt(framePlusOne.throw_one_a);
				runningScore += parseInt(framePlusOne.throw_two_a);
			} else {
				runningScore += parseInt(framePlusOne.throw_one_a);
				runningScore += parseInt(framePlusOne.throw_one_b);
			}
		} else if (parseInt(frame.number) === 10) {
			if (frame.throw_one_a === MAX_PINS_DOWN) {
				if (frame.throw_two_a === MAX_PINS_DOWN) {
					runningScore += parseInt(frame.throw_two_a);
					if (frame.throw_three_a === MAX_PINS_DOWN) {
						runningScore += parseInt(frame.throw_three_a);
					} else {
						runningScore += parseInt(frame.throw_three_a);
						runningScore += parseInt(frame.throw_three_b);
					}
				} else {
					runningScore += parseInt(frame.throw_two_a);
					runningScore += parseInt(frame.throw_two_b);
				}
			} else {
				runningScore += parseInt(frame.throw_one_a);
				runningScore += parseInt(frame.throw_one_b);
			}
		}
	} else if (parseInt(frame.throw_one_a) < parseInt(MAX_PINS_DOWN) && (parseInt(frame.throw_one_a) + parseInt(frame.throw_one_b) === 10)) {
		console.log('spare!');
		runningScore += parseInt(frame.throw_one_a) + parseInt(frame.throw_one_b);
		if (parseInt(frame.number) < 10) {
			var plusOneIndex = (parseInt(frame.number) + 1).toString();
			var framePlusOne = frames.find(item => item.number === plusOneIndex);
			runningScore += parseInt(framePlusOne.throw_one_a);
		} else {
			runningScore += parseInt(frame.throw_two_a);
		}
	} else {
		console.log('misfire!');
		runningScore += parseInt(frame.throw_one_a) + parseInt(frame.throw_one_b);
	}
	return runningScore;
}
//process score to scoreboard
var processScoreToTable = function (scoreObj) {
	// console.log(scoreObj);
	var table = document.createElement('table');
	table.className += "table table-hover";
	table.innerHTML =
		'<tr>\
		<th width="20%">Date</th>\
		<th width="35%">Name</th>\
		<th width="35%">Frames</th>\
		<th width="10%">Score</th>\
	</tr>';
	for (var item in scoreObj) {
		var dateOfGame = new Date(scoreObj[item].date).toISOString().split('T')[0];
		var framesDiv = '';
		var scoresDiv = '';
		var scoreCount = 0;
		for (var i = 0; i < scoreObj[item].frames.length; i++) {
			// console.log(scoreObj[item].frames[i]);
			// console.log(computeScore(scoreObj[item].frames[i], scoreObj[item].frames));
			var frameScore = computeScore(scoreObj[item].frames[i], scoreObj[item].frames);
			scoreCount += frameScore;
			// console.log('frame ' + scoreObj[item].frames[i].number + ': ' + frameScore);
			// console.log('total score: ' + scoreCount);
			framesDiv += 'frame ' + scoreObj[item].frames[i].number + ': ' + scoreObj[item].frames[i].throw_one_a + ' | ' + scoreObj[item].frames[i].throw_one_b + '<br>';
			if (scoreObj[item].frames[i].hasOwnProperty('throw_two_a') && scoreObj[item].frames[i].hasOwnProperty('throw_two_b')) {
				framesDiv += 'frame ' + scoreObj[item].frames[i].number + ': ' + scoreObj[item].frames[i].throw_two_a + ' | ' + scoreObj[item].frames[i].throw_two_b + '<br>';
			}
			if (scoreObj[item].frames[i].hasOwnProperty('throw_three_a') && scoreObj[item].frames[i].hasOwnProperty('throw_three_b')) {
				framesDiv += 'frame ' + scoreObj[item].frames[i].number + ': ' + scoreObj[item].frames[i].throw_three_a + ' | ' + scoreObj[item].frames[i].throw_three_b + '<br>';
			}
			scoresDiv += scoreCount + '<br>';
		}
		table.innerHTML +=
			'<tr>\
			<td>' + dateOfGame + '</td>\
			<td>' + item + '</td>\
			<td>' + framesDiv + '</td>\
			<td>' + scoresDiv + '</td>\
		</tr>';
		framesDiv = '';
		scoresDiv = '';
	}

	document.getElementById('scoreboard-container').appendChild(table);
}

//get score for all games
var getScore = function () {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/score');
	xhr.onload = function () {
		if (xhr.status === 200) {
			var scoreObj = JSON.parse(xhr.responseText);
			if (scoreObj.hasOwnProperty('data')) {
				processScoreToTable(scoreObj.data);
			} else {
				alert('Unable to fetch score data');
			}
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

//getScore();//////////////////////////////////////////////////////////////////////////////////////uncomment to start