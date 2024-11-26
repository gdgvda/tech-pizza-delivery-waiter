<?php
header("Content-Type:text/plain");
$composer=json_decode(file_get_contents("../composer.json"));
$version=$composer->version;
$title=$composer->title;
$description=$composer->description;
$owner=$composer->owner;
$host=$_SERVER['SERVER_ADDR'];
echo <<<EOF
$title
$description
$owner
Host: $host
Version: $version
EOF;
