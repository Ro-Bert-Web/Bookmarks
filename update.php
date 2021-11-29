<?php
  include "connection.php";

  if (!array_key_exists("id", $_POST)) {
    http_response_code(400);
    return;
  }

  $rows = [];
  if (array_key_exists("x", $_POST)) {
    array_push($rows, sprintf("x = %d", $_POST["x"]));
  }
  if (array_key_exists("y", $_POST)) {
    array_push($rows, sprintf("y = %d", $_POST["y"]));
  }
  if (array_key_exists("url", $_POST)) {
    array_push($rows, sprintf("url = '%s'", $_POST["url"]));
  }
  if (array_key_exists("iconType", $_POST)) {
    array_push($rows, sprintf("iconType = '%s'", $_POST["iconType"]));
  }
  if (array_key_exists("icon", $_POST)) {
    array_push($rows, sprintf("icon = '%s'", $_POST["icon"]));
  }

  $sql = "update elements set";
  foreach ($rows as $i => $row) {
    if ($i != 0) {
      $sql .= ",";
    }
    $sql .= " $row";
  }
  $sql .= " where id = " . $_POST["id"];

  $result = mysqli_query($conn, $sql);

  if ($result == 0) {
    http_response_code(500);
  }
?>
