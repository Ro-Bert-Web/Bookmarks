<?php
  include "connection.php";
  $sql = "select * from elements";
  $elements = mysqli_query($conn, $sql);
  while ($element = mysqli_fetch_assoc($elements)) {
    printf(
      "<script class = 'cleanUp'>createElement(%d, '%s', '%s', '%s', '%s', '%s');</script>",
      $element["id"],
      $element["x"],
      $element["y"],
      $element["url"],
      $element["iconType"],
      $element["icon"]
    );
  }
?>
