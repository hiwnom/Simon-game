var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var colorIndex=0;

function nextSequence() {
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  userClickedPattern=[];
  colorIndex=0;
  level++;
  $("h1").text("Level " + level);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(50);
  playSound(randomChosenColor);
  console.log(gamePattern);
}

function checkAnswer() {
  if (gamePattern[colorIndex] === userClickedPattern[colorIndex]) {
    colorIndex++;
    if (level === colorIndex) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 200);
    startOver();
  }

}

function startOver() {
  $("h1").text("Game Over, Press 'A' to Restart");
  level=0;
  gamePattern=[];
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  //$("#"+currentColor).addClass("pressed")
  $("#"+currentColor).toggleClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).toggleClass("pressed");
  }, 100);
}



$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer();
});


$("body").on("keydown", function(event) {
  console.log(event.key);
  if (level === 0 && event.key === "a") {
    nextSequence();
  }
});
