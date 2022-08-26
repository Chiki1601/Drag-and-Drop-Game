document.body.onload = function() {
  var monsterDiv = document.getElementById("monsterDiv");
  var partsDiv = document.getElementById("partsDiv");
  var parts = partsDiv.getElementsByTagName("img");
  var monsters = monsterDiv.getElementsByTagName("img");
  var itemIndex = 0;
  var xDistance = 0;
  var yDistance = 0;
  var foo = null;

  for (var i = 0; i < parts.length; i++) {
    parts[i].addEventListener("dragstart", dragstartFx, false);
  }

  function dragstartFx(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.effectAllow = "move";

    if (event.target.style.top === "") {
      partsDiv.style.backgroundColor = "rgba(255,255,255,0.04)";
    }

    xDistance = event.clientX - event.target.offsetLeft;
    yDistance = event.clientY - event.target.offsetTop;
  }

  for (i = 0; i < monsters.length; i++) {
    monsters[i].addEventListener("dragenter", dragenterFx, false);
  }
  function dragenterFx(event) {
    event.target.classList.toggle("active");
  }

  document.body.ondragover = function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  document.body.ondrop = function(event) {
    event.preventDefault();
    if (event.target.parentNode === monsterDiv) {
      event.target.classList.toggle("active");
    }
    var data = event.dataTransfer.getData("text");
    var itemMove = document.getElementById(data);
    partsDiv.style.backgroundColor = "rgba(255,255,255,0.31)";
    itemMove.className = "itemMove";

    itemMove.style.top = event.clientY - yDistance + "px";
    itemMove.style.left = event.clientX - xDistance + "px";

    itemMove.style.zIndex = itemIndex + 1;
    itemIndex = Number(itemMove.style.zIndex);
  };

  var heightPartsDiv = window.getComputedStyle(partsDiv).height;
  partsDiv.style.height = heightPartsDiv;
};

document.getElementsByClassName("btn")[0].onclick = function(e) {
    history.go(0);
};