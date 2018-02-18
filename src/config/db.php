<?php
class db {
	private static $instance = null;
	private $dbHost = 'localhost';
	private $dbUser = 'root';
	private $dbPassword = '';
	private $dbName = 'tenpinbowling';
	private $connection = null;

	private function __construct() {
		$connectionString = 'mysql:host=' . $this->dbHost . ';dbname=' . $this->dbName;
		$this->connection = new PDO($connectionString, $this->dbUser, $this->dbPassword);
		$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	public static function getInstance() {
		if(empty(self::$instance)) {
			self::$instance = new db();
		}

		return self::$instance;
	}

	public function getConnection() {
		return $this->connection;
	}
}
