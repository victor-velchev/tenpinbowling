<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../src/config/db.php';

function sanitize($input) {
	return strip_tags(trim(stripslashes(htmlentities($input))));
}

function execute($sql, $args) {
	$db = db::getInstance();
	$dbConnection = $db->getConnection();
	$statement = $dbConnection->prepare($sql);
	$statement->execute($args);
}

$getScore = function (Request $request, Response $response, array $args) {
	$sql = 'SELECT date, name, number, throw_one_a, throw_one_b, throw_two_a, throw_two_b, throw_three_a, throw_three_b FROM games g INNER JOIN frames f ON g.id = f.game_id ORDER BY game_id, number ASC';
	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
	$status = 200;
	try {
		$db = db::getInstance();
		$dbConnection = $db->getConnection();
		$statement = $dbConnection->query($sql);
		$games = $statement->fetchAll(PDO::FETCH_OBJ);
		$resp['status'] = 'success';
		$gamesMap = array();
		if (!empty($games) && count($games > 0)) {
			foreach ($games as $game) {
				if (!empty($game->name)) {
					if (empty($gamesMap[$game->name])) {
						$gamesMap[$game->name] = array('date'=>$game->date, 'frames'=>array());
					}
					$data = array(
						'number'=>$game->number,
						'throw_one_a'=>$game->throw_one_a,
						'throw_one_b'=>$game->throw_one_b
					);
					if ($game->number == 10) {
						$data['throw_two_a'] = $game->throw_two_a;
						$data['throw_two_b'] = $game->throw_two_b;
						$data['throw_three_a'] = $game->throw_three_a;
						$data['throw_three_b'] = $game->throw_three_b;
					}
					$gamesMap[$game->name]['frames'][] = $data;
				}
			}
		}
		$resp['data'] = $gamesMap;
	} catch (Exception $e) {
		$status = 400;
		$resp['status'] = 'error';
		$resp['message'] = $e->getMessage();
	}

	return $response->withJson($resp, $status);
};

$createFrame = function (Request $request, Response $response, array $args) {
	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
	$status = 200;
	$args = $request->getParsedBody();

	if (empty($args['game_id']) || empty($args['number']) || (empty($args['throw_one_a']) && $args['throw_one_a'] != '0') || (empty($args['throw_one_b']) && $args['throw_one_b'] != '0')) {
		$status = 400;
		$resp['status'] = 'error';
		$resp['message'] = 'Some of the required parameters to populate a frame are missing';
	} else {
		$game_id = intval(sanitize($args['game_id']));
		$number = intval(sanitize($args['number']));
		$throw_one_a = intval(sanitize($args['throw_one_a']));
		$throw_one_b = intval(sanitize($args['throw_one_b']));
		$throw_two_a = intval(sanitize($args['throw_two_a']));
		$throw_two_b = intval(sanitize($args['throw_two_b']));
		$throw_three_a = intval(sanitize($args['throw_three_a']));
		$throw_three_b = intval(sanitize($args['throw_three_b']));
		if ($number < 10) {
			$check = $game_id > 0 && $number > 0 &&
			($throw_one_a >= 0 && $throw_one_a <= 10 && $throw_one_b >= 0 && $throw_one_b <= 10 && ($throw_one_a + $throw_one_b) <= 10);
		} else if ($number == 10) {
			$check = $game_id > 0 &&
			($throw_one_a >= 0 && $throw_one_a <= 10 && $throw_one_b >= 0 && $throw_one_b <= 10 && ($throw_one_a + $throw_one_b) <= 10) &&
			($throw_two_a >= 0 && $throw_two_a <= 10 && $throw_two_b >= 0 && $throw_two_b <= 10 && ($throw_two_a + $throw_two_b) <= 10) &&
			($throw_three_a >= 0 && $throw_three_a <= 10 && $throw_three_b >= 0 && $throw_three_b <= 10 && ($throw_three_a + $throw_three_b) <= 10);
		}
		if ($check) {
			$sql = 'INSERT INTO frames (game_id, number, throw_one_a, throw_one_b, throw_two_a, throw_two_b, throw_three_a, throw_three_b) VALUES (:game_id, :number, :throw_one_a, :throw_one_b, :throw_two_a, :throw_two_b, :throw_three_a, :throw_three_b)';
			try {
				execute($sql, array(
					':game_id'=>$game_id,
					':number'=>$number,
					':throw_one_a'=>$throw_one_a,
					':throw_one_b'=>$throw_one_b,
					':throw_two_a'=>$throw_two_a,
					':throw_two_b'=>$throw_two_b,
					':throw_three_a'=>$throw_three_a,
					':throw_three_b'=>$throw_three_b
				));
				$resp['status'] = 'success';
				$resp['data'] = 'frame added';
			} catch (Exception $e) {
				$resp['status'] = 'error';
				$resp['message'] = $e->getMessage();
			}
		} else {
			$status = 400;
			$resp['status'] = 'error';
			$resp['message'] = 'Some of the required parameters to populate a frame are incorrect';
		}
	}

    return $response->withJson($resp, $status);
};

$updateFrame = function (Request $request, Response $response, array $args) {
	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
	$status = 200;
	$args = $request->getParsedBody();
	var_dump($args); die;
	if (empty($args['game_id']) || empty($args['number']) || (empty($args['throw_one_a']) && $args['throw_one_a'] != '0') || (empty($args['throw_one_b']) && $args['throw_one_b'] != '0')) {
		$status = 400;
		$resp['status'] = 'error';
		$resp['message'] = 'Some of the required parameters to populate a frame are missing';
	} else {
		$game_id = intval(sanitize($args['game_id']));
		$number = intval(sanitize($args['number']));
		$throw_one_a = intval(sanitize($args['throw_one_a']));
		$throw_one_b = intval(sanitize($args['throw_one_b']));
		$throw_two_a = intval(sanitize($args['throw_two_a']));
		$throw_two_b = intval(sanitize($args['throw_two_b']));
		$throw_three_a = intval(sanitize($args['throw_three_a']));
		$throw_three_b = intval(sanitize($args['throw_three_b']));
		if ($number < 10) {
			$check = $game_id > 0 && $number > 0 &&
			($throw_one_a >= 0 && $throw_one_a <= 10 && $throw_one_b >= 0 && $throw_one_b <= 10 && ($throw_one_a + $throw_one_b) <= 10);
		} else if ($number == 10) {
			$check = $game_id > 0 &&
			($throw_one_a >= 0 && $throw_one_a <= 10 && $throw_one_b >= 0 && $throw_one_b <= 10 && ($throw_one_a + $throw_one_b) <= 10) &&
			($throw_two_a >= 0 && $throw_two_a <= 10 && $throw_two_b >= 0 && $throw_two_b <= 10 && ($throw_two_a + $throw_two_b) <= 10) &&
			($throw_three_a >= 0 && $throw_three_a <= 10 && $throw_three_b >= 0 && $throw_three_b <= 10 && ($throw_three_a + $throw_three_b) <= 10);
		}
		if ($check) {
			$sql = 'UPDATE frames SET throw_one_a = :throw_one_a, throw_one_b = :throw_one_b, throw_two_a = :throw_two_a, throw_two_b = :throw_two_b, throw_three_a = :throw_three_a, throw_three_b = :throw_three_b WHERE (game_id = :game_id AND number = :number)';
			try {
				execute($sql, array(
					':game_id'=>$game_id,
					':number'=>$number,
					':throw_one_a'=>$throw_one_a,
					':throw_one_b'=>$throw_one_b,
					':throw_two_a'=>$throw_two_a,
					':throw_two_b'=>$throw_two_b,
					':throw_three_a'=>$throw_three_a,
					':throw_three_b'=>$throw_three_b
				));
				$resp['status'] = 'success';
				$resp['data'] = 'frame updated';
			} catch (Exception $e) {
				$resp['status'] = 'error';
				$resp['message'] = $e->getMessage();
			}
		} else {
			$status = 200;
			$resp['status'] = 'error';
			$resp['message'] = 'Some of the required parameters to update the frame are incorrect';
		}
	}

    return $response->withJson($resp, $status);
};

// $deleteFrame = function (Request $request, Response $response, array $args) {
// 	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
// 	$status = 200;
// 	$args = $request->getParsedBody();

// 	if (empty($args['game_id']) || empty($args['number'])) {
// 		$status = 400;
// 		$resp['status'] = 'error';
// 		$resp['message'] = 'Some of the required parameters to populate a frame are missing';
// 	} else {
// 		$game_id = intval(sanitize($args['game_id']));
// 		$number = intval(sanitize($args['number']));
// 		$check = $game_id > 0 && ($number > 0 && $number < 11);

// 		if ($check) {
// 			$sql = 'DELETE FROM frames WHERE game_id = :game_id AND number = :number';
// 			try {
// 				execute($sql, array(
// 					':game_id'=>$game_id,
// 					':number'=>$number
// 				));
// 				$resp['status'] = 'success';
// 				$resp['data'] = 'frame deleted';
// 			} catch (Exception $e) {
// 				$resp['status'] = 'error';
// 				$resp['message'] = $e->getMessage();
// 			}
// 		} else {
// 			$status = 400;
// 			$resp['status'] = 'error';
// 			$resp['message'] = 'Some of the required parameters to delete the frame are incorrect';
// 		}
// 	}

//     return $response->withJson($resp, $status);
// };

$getGame = function (Request $request, Response $response, array $args) {
	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
	$status = 200;

	$sql = 'SELECT id, name FROM games ORDER BY id ASC';
	try {
		$db = db::getInstance();
		$dbConnection = $db->getConnection();
		$statement = $dbConnection->query($sql);
		$gamesByName = $statement->fetchAll(PDO::FETCH_OBJ);
		$resp['status'] = 'success';
		$resp['data'] = $gamesByName;
	} catch (Exception $e) {
		$resp['status'] = 'error';
		$resp['message'] = $e->getMessage();
	}

    return $response->withJson($resp, $status);
};

$getGameById = function (Request $request, Response $response, array $args) {
	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
	$status = 200;

	if (empty($args['game_id'])) {
		$status = 400;
		$resp['status'] = 'error';
		$resp['message'] = 'Some of the required parameters to get a game by id are missing';
	} else {
		$game_id = intval(sanitize($args['game_id']));
		$check = $game_id > 0;

		if ($check) {
			$sql = 'SELECT number, throw_one_a, throw_one_b, throw_two_a, throw_two_b, throw_three_a, throw_three_b FROM frames WHERE game_id = :game_id';
			try {
				$db = db::getInstance();
				$dbConnection = $db->getConnection();
				$statement = $dbConnection->prepare($sql);
				$statement->bindValue(':game_id', $game_id);
				$statement->execute();
				$frames = $statement->fetchAll(PDO::FETCH_OBJ);
				$framesData = array();
				foreach ($frames as $frame) {
					$frameData = array('number'=>$frame->number, 'throw_one_a'=>$frame->throw_one_a, 'throw_one_b'=>$frame->throw_one_b);
					if (!empty($frame->throw_two_a)) {
						$frameData['throw_two_a'] = $frame->throw_two_a;
						$frameData['throw_two_b'] = $frame->throw_two_b;
					}
					if (!empty($frame->throw_three_a)) {
						$frameData['throw_three_a'] = $frame->throw_three_a;
						$frameData['throw_three_b'] = $frame->throw_three_b;
					}
					$framesData[] = $frameData;
				}
				$resp['status'] = 'success';
				$resp['data'] = $framesData;
			} catch (Exception $e) {
				$resp['status'] = 'error';
				$resp['message'] = $e->getMessage();
			}
		} else {
			$status = 200;
			$resp['status'] = 'error';
			$resp['message'] = 'Some of the required parameters to update the frame are incorrect';
		}
	}

    return $response->withJson($resp, $status);
};

$createGame = function (Request $request, Response $response, array $args) {
	$resp = array('status'=>'', 'data'=>'', 'message'=>'');
	$status = 200;
	$args = $request->getParsedBody();

	if (empty($args['name'])) {
		$status = 400;
		$resp['status'] = 'error';
		$resp['message'] = 'Some of the required parameters to create a game are missing';
	} else {
		$name = sanitize($args['name']);
		$check = !empty($name);

		if ($check) {
			$sql = 'INSERT INTO games (name) VALUES (:name)';
			try {
				execute($sql, array(
					':name'=>$name
				));
				$resp['status'] = 'success';
				$resp['data'] = 'game added';
			} catch (Exception $e) {
				$resp['status'] = 'error';
				$resp['message'] = $e->getMessage();
			}
		} else {
			$status = 400;
			$resp['status'] = 'error';
			$resp['message'] = 'Some of the required parameters to create a game are incorrect';
		}
	}

    return $response->withJson($resp, $status);
};

// $deleteGame = function (Request $request, Response $response, array $args) {
// 	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
// 	$status = 200;
// 	$args = $request->getParsedBody();

// 	if (empty($args['id'])) {
// 		$status = 400;
// 		$resp['status'] = 'error';
// 		$resp['message'] = 'Some of the required parameters to delete a game are missing';
// 	} else {
// 		$id = intval(sanitize($args['id']));
// 		$check = $id > 0;

// 		if ($check) {
// 			$sql = 'DELETE FROM games WHERE id = :id';
// 			try {
// 				execute($sql, array(
// 					':id'=>$game_id
// 				));
// 				$resp['status'] = 'success';
// 				$resp['data'] = 'game deleted';
// 			} catch (Exception $e) {
// 				$resp['status'] = 'error';
// 				$resp['message'] = $e->getMessage();
// 			}
// 		} else {
// 			$status = 400;
// 			$resp['status'] = 'error';
// 			$resp['message'] = 'Some of the required parameters to delete the game are incorrect';
// 		}
// 	}

//     return $response->withJson($resp, $status);
// };

// $updateGame = function (Request $request, Response $response, array $args) {
// 	$resp = array('status'=>'', 'message'=>'', 'data'=>'');
// 	$status = 200;
// 	$args = $request->getParsedBody();

// 	if (empty($args['id']) || empty($args['name'])) {
// 		$status = 400;
// 		$resp['status'] = 'error';
// 		$resp['message'] = 'Some of the required parameters to update a game are missing';
// 	} else {
// 		$id = intval(sanitize($args['id']));
// 		$name = sanitize($args['name']);
// 		$check = $id > 0 && !empty($name);

// 		if ($check) {
// 			$sql = 'UPDATE games SET name = :name WHERE id = :id';
// 			try {
// 				execute($sql, array(
// 					':id'=>$id,
// 					':name'=>$name
// 				));
// 				$resp['status'] = 'success';
// 				$resp['data'] = 'game updated';
// 			} catch (Exception $e) {
// 				$resp['status'] = 'error';
// 				$resp['message'] = $e->getMessage();
// 			}
// 		} else {
// 			$status = 400;
// 			$resp['status'] = 'error';
// 			$resp['message'] = 'Some of the required parameters to update the game are incorrect';
// 		}
// 	}

//     return $response->withJson($resp, $status);
// };

$app->get('/api/score', $getScore);

$app->post('/api/frame', $createFrame);
// $app->delete('/api/frame', $deleteFrame);
$app->put('/api/frame', $updateFrame);

$app->get('/api/game', $getGame);
$app->get('/api/game/{game_id}', $getGameById);
$app->post('/api/game', $createGame);
// $app->delete('/api/game', $deleteGame);
// $app->put('/api/game', $updateGame);

$app->run();
