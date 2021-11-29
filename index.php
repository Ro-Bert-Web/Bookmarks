<html>
  <head>
    <title>Bookmarks</title>
    <link rel = "stylesheet" href = "style.css" />
    <script src = "post.js"></script>
    <script src = "generate.js"></script>
  </head>
  <body>
    <div id = "menuHeader" style = "height: 80px;">
      <img src = "https://cdn.iconscout.com/icon/free/png-512/settings-410-461751.png"
          onclick = "menuClick('settings');" />
      <span id = "menuOptions" hidden>
        <img src = "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/add-circle-blue-512.png"
            onclick = "menuClick('add');" />
        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Flat_minus_icon.svg/768px-Flat_minus_icon.svg.png"
            onclick = "menuClick('remove');" />
        <img src = "https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/35-512.png"
            onclick = "menuClick('edit');" />
        <img src = "https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/flip_horizontal-512.png"
            onclick = "menuClick('move');" />
        <img src = "https://cdn0.iconfinder.com/data/icons/web-user-interface-7/130/6-512.png"
            onclick = "menuClick('square');"/>
      </span>
    </div>

    <div id = "infoForm"
        class = "centeredOuter">
      <div class = "centeredInner">
        <label for = "url">Site URL:</label>
        <input type = "url" id = "url" name = "url" /><br><br>
        <label for = "iconType">Icon Type:</label>
        <select name = "iconType" id = "iconType">
          <option value = "">-- Pick One --</option>
          <option value = "text">Text</option>
          <option value = "image">Image</option>
        </select><br><br>
        <div id = "iconText" hidden>
          <label for = "iconText">Icon Text:</label>
          <input type = "text" name = "iconText" /><br><br>
        </div>
        <div id = "iconImage" hidden>
          <label for = "iconImage">Icon URL:</label>
          <input type = "url" name = "iconImage" /><br><br>
        </div>
        <div style = "text-align: center;">
          <input type = "button"
              id = "infoSubmit"
              value = "Create"
              onclick = "submitInfo();" />
        </div>
      </div>
    </div>

    <?php include "getElements.php" ?>
    <script src = "dynamic.js"></script>
  </body>
</html>
