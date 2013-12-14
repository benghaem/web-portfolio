<?php

$path = "../Gallery";
$results = scandir($path);

foreach ($results as $result) {
    if ($result === '.' or $result === '..') continue;

    if (is_dir($path . '/' . $result)) {
        genThumbs("{$result}/","{$result}/thumbs/",175, 175);
        genGallery("{$result}/","{$result}/thumbs/", "{$result}" );
    }
}

function genThumbs()


?>