<?php
  include "connection.php";

  if (!array_key_exists("id", $_POST)) {
    http_response_code(400);
    return;
  }

  $sql = sprintf(
    "delete from elements where id = %d",
    $_POST["id"]
  );

  $result = mysqli_query($conn, $sql);

  if ($result == 0) {
    http_response_code(500);
  }
?>
