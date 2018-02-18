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
			var frameScore = computeScore(scoreObj[item].frames[i], scoreObj[item].frames);
			scoreCount += frameScore;
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
};

//getScore();

var getScoreboard = function() {
	alert('You clicked: getScoreboard');
};

var getCreateGame = function() {
	document.getElementById('nav-selector').style["display"] = "none";
	document.getElementById('create-game-div').style["display"] = "block";
};

var createGame = function() {
	var gamename = document.getElementById('gamename').value;
	var params = "name=" + gamename;
	if (gamename && gamename.length > 1) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/game', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onload = function () {
			if (xhr.status === 200) {
				document.getElementById('nav-selector').style["display"] = "";
				document.getElementById('create-game-div').style["display"] = "none";
				document.getElementById('modify-game-div').style["display"] = "none";
			} else {
				alert('Request failed.  Returned status of ' + xhr.status);
			}
		};
		xhr.send(params);
	}
};

var getModifyGame = function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/game');
	xhr.onload = function () {
		if (xhr.status === 200) {
			var resp = JSON.parse(xhr.responseText);
			if (resp.hasOwnProperty('data')) {
				var items = '';
				items += '<option selected>Select a game</option>';
				for (var i = 0; i < resp.data.length; i++) {
					items += '<option value="' + resp.data[i].id + '">' + resp.data[i].name + '</option>';
				}
				document.getElementById('available-games').innerHTML = items;
				document.getElementById('nav-selector').style["display"] = "none";
				document.getElementById('create-game-div').style["display"] = "none";
				document.getElementById('modify-game-div').style["display"] = "inline";
			}
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
};

var updateGameDetailsView = function(el) {
	var items = '<div id="game-details"><table class="table table-hover">\
	<thead>\
		<tr>\
			<th scope="col">#</th>\
			<th scope="col">1)A</th>\
			<th scope="col">1)B</th>\
			<th scope="col">2)A</th>\
			<th scope="col">2)B</th>\
			<th scope="col">3)A</th>\
			<th scope="col">3)B</th>\
			<th scope="col">Update</th>\
		</tr>\
	</thead>\
	<tbody>';
	for (var i = 0; i < el.length; i++) {
		items += '<tr><th scope="row">' + el[i].number + '</th>';
		items += '<td>\
			<input type="text" class="form-control" id="field-throw_one-a-' + el[i].number + '" value="' + el[i].throw_one_a + '">\
		</td>';
		items += '<td>\
			<input type="text" class="form-control" id="field-throw_one-b-' + el[i].number + '" value="' + el[i].throw_one_b + '">\
		</td>';
		var throw_two_disabled = 'disabled';
		if (el[i].hasOwnProperty('throw_two_a') && el[i].hasOwnProperty('throw_two_b')) {
			throw_two_disabled = '';
		}
		items += '<td>\
			<input type="text" class="form-control" id="field-throw_two-a-' + el[i].number + '" value="' + (throw_two_disabled === 'disabled' ? '' : el[i].throw_two_a) + '" ' + throw_two_disabled + '>\
		</td>';
		items += '<td>\
			<input type="text" class="form-control" id="field-throw_two-b-' + el[i].number + '" value="' + (throw_two_disabled === 'disabled' ? '' : el[i].throw_two_b) + '" ' + throw_two_disabled + '>\
		</td>';
		var throw_three_disabled = 'disabled';
		if (el[i].hasOwnProperty('throw_three_a') && el[i].hasOwnProperty('throw_three_b')) {
			throw_three_disabled = '';
		}
		items += '<td>\
			<input type="text" class="form-control" id="field-throw_three-a-' + el[i].number + '" value="' + (throw_three_disabled === 'disabled' ? '' : el[i].throw_three_a) + '" ' + throw_three_disabled + '>\
		</td>';
		items += '<td>\
			<input type="text" class="form-control" id="field-throw_three-b-' + el[i].number + '" value="' + (throw_three_disabled === 'disabled' ? '' : el[i].throw_three_b) + '" ' + throw_three_disabled + '>\
		</td>';
		items += '<td><button type="button" class="btn btn-primary btn-sm" id="btn-field-' + el[i].number + '" onClick="updateGameFrame(this)">Update</button></td>';
	}

	items += '</tr>\
		</tbody>\
	</table></div>';
	var detailsContainer = document.getElementById('game-details');
	detailsContainer.outerHTML = items;
}

var getGameDetailsById = function() {
	var selection = document.getElementById('available-games');
	var gameId = selection.options[selection.selectedIndex].value;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/game/' + gameId);
	xhr.onload = function () {
		if (xhr.status === 200) {
			var resp = JSON.parse(xhr.responseText);
			if (resp.hasOwnProperty('data')) {
				return updateGameDetailsView(resp.data);
			}
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
};

var updateGameFrame = function(btnElement) {
	var numberAsId = btnElement.id;
	var lastIndex = numberAsId.lastIndexOf('-');
	numberAsId = (numberAsId.substr(lastIndex + 1, numberAsId.length));
	var fieldThrowThreeA = document.getElementById('field-throw_three-a-' + numberAsId);
	var fieldThrowThreeB = document.getElementById('field-throw_three-b-' + numberAsId);
	var fieldThrowTwoA = document.getElementById('field-throw_two-a-' + numberAsId);
	var fieldThrowTwoB = document.getElementById('field-throw_two-b-' + numberAsId);
	var fieldThrowOneA = document.getElementById('field-throw_one-a-' + numberAsId);
	var fieldThrowOneB = document.getElementById('field-throw_one-b-' + numberAsId);
	var selection = document.getElementById('available-games');
	var gameId = selection.options[selection.selectedIndex].value;
	var	params = "game_id=" + gameId + "&number=" + numberAsId + "&throw_one_a=" + fieldThrowOneA.value + '&throw_one_b=' + fieldThrowOneB.value;

	if (numberAsId === 10) {
		params += "&throw_two_a=" + fieldThrowTwoA.value + '&throw_one_b=' + fieldThrowTwoB.value + "&throw_three_a=" + fieldThrowThreeA.value + '&throw_three_b=' + fieldThrowThreeB.value;
	}

	var xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/frame', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function () {
		if (xhr.status === 200) {
			document.getElementById('nav-selector').style["display"] = "";
			document.getElementById('create-game-div').style["display"] = "none";
			document.getElementById('modify-game-div').style["display"] = "none";
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send(params);
}