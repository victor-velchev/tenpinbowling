<?php
require 'route.php';

class DbTest extends \PHPUnit_Framework_TestCase
{
    public function testSayHello()
    {
        $this->client->get('/api/game/4');
        $this->assertEquals(200, $this->client->response->status());
    }
}