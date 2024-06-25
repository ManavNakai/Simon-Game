var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var gamePattern=[];
var userClickedPattern=[];
var pressCount=0;

function startOver() {
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  pressCount=0;
}

$(document).on("keydown",function() {
  pressCount++;
  if (pressCount===1) {
    nextSequence();
  }
});

function nextSequence() {
    level++;
    userClickedPattern=[];
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").on("click",function() {
  if(pressCount>0) {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
  }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1]) {
        console.log("success");
        if (currentLevel===level) {
          setTimeout(function() {nextSequence()},1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over")},200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {$("."+currentColour).removeClass("pressed")},100);
}

function playSound(colour){
  switch (colour) {
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;
    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    case "wrong":
      var sound = new Audio("sounds/wrong.mp3");
      sound.play();
      break;    
    default: console.log(colour);
  }
}