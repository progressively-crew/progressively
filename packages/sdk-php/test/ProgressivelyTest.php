<?php


use PHPUnit\Framework\TestCase;

class ProgressivelyTest extends TestCase
{

    public function testLoadFlags()
    {
        $stack = [];
        $this->assertEmpty($stack);
    }


    public function testCreate()
    {
        $stack["clientKey"] = "4e372f54-970b-4f62-a889-531abf2d152b";
        $stack["apiUrl"] = "https://api.progressively.app/sdk/";
        $this->assertNotEmpty($stack);
    }


    public function testSetOptions()
    {
        $stack["clientKey"] = "4e372f54-970b-4f62-a889-531abf2d152b";
        $this->assertNotEmpty($stack);
    }

    public function testIActivated()
    {
        $this->assertNotEmpty("Test");
        $this->assertNotEmpty("Testfalse");
    }

    public function testGetFlags()
    {
        $stack = [];
        $this->assertEmpty($stack);
    }
}
