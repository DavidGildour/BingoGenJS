let fields;

let textFile = new XMLHttpRequest();
textFile.open("GET", "./static/fields.txt", true);
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

$(document).ready( () => {
  let len = $("td").length;
  $("#generate").click( () => {
    fields = shuffle(fields);
    for (let i = 0; i < len; i++){
      $("td").eq(i).html(fields[i]);
    }
  });
});
