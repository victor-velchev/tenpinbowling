<?php
require 'db.php';

class DbTest extends \PHPUnit_Framework_TestCase
{
    private $db;
 
    protected function setUp()
    {
        $this->db = db::getInstance();
    }
 
    protected function tearDown()
    {
        $this->db = null;
    }
 
    public function testDbInstance()
    {
        $this->assertNotEmpty($this->db);
    }

    public function testDbConnection()
    {
        $dbConnection = $this->db->getConnection();
        $this->assertNotEmpty($dbConnection);
    }
}
