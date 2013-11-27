<?php

$path = "../Gallery";
$results = scandir($path);

foreach ($results as $result) {
    if ($result === '.' or $result === '..') continue;

    if (is_dir($path . '/' . $result)) {
        createThumbs("{$result}/","{$result}/thumbs/",175, 175);
        createGallery("{$result}/","{$result}/thumbs/", "{$result}" );
    }
}


function createThumbs( $pathToImages, $pathToThumbs, $thumbWidth, $thumbHeight)
{
  // open the directory
  $dir = opendir( $pathToImages );

  // loop through it, looking for any/all JPG files:
  while (false !== ($fname = readdir( $dir ))) {
    // parse path for the extension
    $info = pathinfo($pathToImages . $fname);
    // continue only if this is a JPEG image
    if ( strtolower($info['extension']) == 'jpg' )
    {
      echo "Creating thumbnail for {$fname} <br />";

      // load image and get image size
      $img = imagecreatefromjpeg( "{$pathToImages}{$fname}" );
      $width = imagesx( $img );
      $height = imagesy( $img );

      if ($width > $height)
      {
      // calculate thumbnail size
      $new_width = $thumbWidth;
      $new_height = floor( $height * ( $thumbWidth / $width ) );
      }
      else
      {
      // calculate thumbnail size
      $new_width = floor( $width * ( $thumbHeight / $height ) );
      $new_height = $thumbHeight;    
      }
      // create a new temporary image
      $tmp_img = imagecreatetruecolor( $new_width, $new_height );

      // copy and resize old image into new image
      imagecopyresized( $tmp_img, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height );

      // save thumbnail into a file
      imagejpeg( $tmp_img, "{$pathToThumbs}{$fname}" );
    }
  }
  // close the directory
  closedir( $dir );
}

function createGallery( $pathToImages, $pathToThumbs, $filename)
{
  echo "Creating {$filename}.html <br />";
  $caller = "backbttn";
  $output .= "<a href=\"#portfolio\"><div class=\"portback\"></div></a>";
  $output .= "<div class=\"gallcenter\">";
  // open the directory
  $dir = opendir( $pathToThumbs );

  $counter = 0;
  // loop through the directory
  while (false !== ($fname = readdir($dir)))
  {
    // strip the . and .. entries out
    if ($fname != '.' && $fname != '..' && $fname != '.DS_Store')
    {
      $output .= "<div class=\"imagebox\"><span></span><a href=\"Gallery/{$pathToImages}{$fname}\" rel=\"lightbox[art]\" >";
      $output .= "<img src=\"Gallery/{$pathToThumbs}{$fname}\" border=\"0\" />";
      $output .= "</a></div>";
    }
  }
  // close the directory
  closedir( $dir );

  $output .= "</div>";


  // open the file
  $fhandle = fopen( "{$filename}.html", "w" );
  // write the contents of the $output variable to the file
  fwrite( $fhandle, $output );
  // close the file
  fclose( $fhandle );
}
?>