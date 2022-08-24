<?php

namespace Progressively;

class Flags
{
    private $flagsDict = array();
    public function __construct(array $flags = [])
    {
        $this->flagsDict = $flags;
    }

    public function isActivated($flagName): bool
    {
        return $this->flagsDict[$flagName];
    }
}
