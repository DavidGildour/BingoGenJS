let fields;

let textFile = new XMLHttpRequest();
textFile.open("GET", "../static/fields.txt", true);
textFile.onreadystatechange = () => {
  if (textFile.readyState == 4 && (textFile.status == 200 || textFile.status == 0)){
      fields = textFile.responseText.split("\n").slice(0, -1);
  }
};
textFile.send(null);

let shuffle = array => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

let getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

$(document).ready( () => {
  let len = $("td").length;

  $("#print").click( () => {
    $(".noprint").toggle();
    window.print();
    $(".noprint").toggle();
  });

  $("#generate").click( () => {
    fields = shuffle(fields);

    let colourPick = $("#colour:checked").attr("value");

    if (colourPick == "rand"){
      $("div.cell").css("background-image", `url("../static/bgs/${getRandomInt(9)}.gif")`);
    } else {
      $("div.cell").css("background-image", `url("../static/bgs/${colourPick}.gif")`);
    }

    for (let i = 0; i < len; i++){
      $("table.bingo td div.cell").eq(i).html(fields[i]);
    }
  });
});
