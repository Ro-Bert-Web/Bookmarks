<?php
  include "connection.php";

  if (!array_key_exists("url", $_POST) ||
      !array_key_exists("iconType", $_POST) ||
      !array_key_exists("icon", $_POST)) {
    http_response_code(400);
    return;
  }

  $sql = sprintf(
    "insert into elements (url, iconType, icon) values('%s', '%s', '%s')",
    $_POST["url"],
    $_POST["iconType"],
    $_POST["icon"]
  );

  $result = mysqli_query($conn, $sql);

  if ($result == 0) {
    http_response_code(500);
  }

  $result = mysqli_query($conn, "select last_insert_id()");
  $id = mysqli_fetch_assoc($result)["last_insert_id()"];
  echo $id;
?>
