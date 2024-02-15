var color = ["blue", "green", "red", "yellow"]
var gamePattern = []
var userPattern = []
var level = 0
var start = false

//if the game is not started, user press the key then game will start

    $("body").keypress(function () {
        if (!start) {
        nextSequence()
        start = true
    }
    
})


//user click function
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id")
    userPattern.push(userChosenColor)
    playSound(userChosenColor)

    animation(userChosenColor)

    checkAnswer(userPattern.length - 1)
})

//game goes in the itteration
function nextSequence() {
    userPattern = []

    $("h1").html("level " + level)
    level++

    var randomNumber = Math.floor(Math.random() * 4)

    var randomColor = color[randomNumber]

    gamePattern.push(randomColor)


    $("#" + randomColor).fadeOut(100).fadeIn(100);

    playSound(randomColor)
}

// game is over
function startOver() {
    gamePattern = []
    level = 0
    start = false
}



function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3")
    sound.play()
}


function animation(color) {
    $("#" + color).addClass("pressed")
    setTimeout(() => {
        $("#" + color).removeClass("pressed")
    }, 200);

}

//checking the user clicked pattern
function checkAnswer(ans) {
    if (userPattern[ans] == gamePattern[ans]) {
        console.log('success')

        //checks complete userPattern with gamePattern
        if (userPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }
    else {
        console.log("wrong")

        playSound("wrong")

        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").html("Game Over, press any key to restart")

        startOver()
    }

}


