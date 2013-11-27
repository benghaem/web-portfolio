<?php
$path = "../Gallery";
$results = scandir($path);

foreach ($results as $result) {
    if ($result === '.' or $result === '..') continue;

    if (is_dir($path . '/' . $result)) {
      $name = str_replace("_", " ", "{$result}");
      $output .= "<div class=\"imagebox\"><span></span><a id=\"main\" href=\"#pt-${result}\">";
      $output .= "<h2>{$name}</h2>";
      $output .= "</a></div>";
    }
}
  $file = fopen( "portfoliobase.html", "w" );
  fwrite( $file, $output );
  fclose( $file );

?>