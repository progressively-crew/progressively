<?php

namespace Progressively;

use PHPUnit\Framework\TestCase;
use Progressively\Progressively;
use function PHPUnit\Framework\assertEquals;

require __DIR__ . "/../src/Progressively.php";
require __DIR__ . "/../src/Http.php";
require __DIR__ . "/../src/Flags.php";

class ProgressivelyTest extends TestCase
{

    public function testRetrievingAnExistingAndActivatedFlag()
    {
        // Arrange
        $httpStub = $this->createMock(Http::class);
        $httpStub->method('execute')
            ->willReturn(array("newHomepage" => true));

        // Act
        $sdk = Progressively::create("my-api-key", array(), $httpStub);
        $flags = $sdk->loadFlags();

        // Assert
        assertEquals($flags->isActivated(('newHomepage')), true);
    }

    public function testRetrievingAnExistingAndNotActivatedFlag()
    {
        // Arrange
        $httpStub = $this->createMock(Http::class);
        $httpStub->method('execute')
            ->willReturn(array("newHomepage" => false));

        // Act
        $sdk = Progressively::create("my-api-key", array(), $httpStub);
        $flags = $sdk->loadFlags();

        // Assert
        assertEquals($flags->isActivated(('newHomepage')), false);
    }

    public function testRetrievingANotExistingFlag()
    {
        // Arrange
        $httpStub = $this->createMock(Http::class);
        $httpStub->method('execute')
            ->willReturn(array("newHomepage" => true));

        // Act
        $sdk = Progressively::create("my-api-key", array(), $httpStub);
        $flags = $sdk->loadFlags();

        // Assert
        assertEquals($flags->isActivated(('notExistingFlag')), false);
    }
}
