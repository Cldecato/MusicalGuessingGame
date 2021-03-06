$(document).ready(function() {

    var choices = [];
    var question;
    var correct;
    var incorrect;
    var category;
    var userGuess;
    var clicks = 0;
    var gameLength = 10;
    var time = 20;
    var intervalId;
    var correctAns = 0;
    var totalQs = 0;
    var windowTimeout;

    function authenticate() {
        var auth = {
            url: "fathomless-eyrie-24498.herokuapp.com/spotify/authenticate",
            method: "GET"
        }
        $.ajax(auth).done(function (response) {
            console.log(response);
            return response.access_token;
        });
    };

    authenticate();
    authToken = authenticate();
    // console.log(authToken);

    function search(query) {
        var search = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.spotify.com/v1/search?q=" + query,
            "method": "GET",
            "headers": {
              "Authorization": "Bearer " + authToken,
              "Cache-Control": "no-cache",
              "Postman-Token": "3914cc76-ac7e-4fba-be16-56dd3b0bdbe6"
            }
        }
          
        $.ajax(search).done(function (response) {
            return response;
        }).fail(function (error) { 
            if(error.message = "Invalid access token") {
                var token = auth();
                search(token, searchTerm);
            }
        });
    }

    if(authToken) {
        var results = search();
    }

    function getGiphy() {
        var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=no";
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            var noGif = $("<img>");
            noGif.attr("src", results.images.fixed_height.url);
            $("#victory").append(noGif);
        })
    }
    

    function getAPI() {
        var queryURL = "https://opentdb.com/api.php?amount=1&type=multiple";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var options = [];
            var indexChecker = [ 0, 1, 2, 3];
            var help = response.results[0];
            question = decodeURIComponent(help.question);
            correct = decodeURIComponent(help.correct_answer);
            incorrect = help.incorrect_answers;
            category = decodeURIComponent(help.category);
            options.push(correct);
            for ( i = 0; i < incorrect.length; i++) {
                options.push(decodeURIComponent(incorrect[i]));
            }
            for ( i = 0; i < 4; i++) {
                num = Math.floor(Math.random() * (indexChecker.length - 1))
                randomIndex = indexChecker[num];
                choices[randomIndex] = options[i];
                indexChecker.splice(num, 1);
            }
            showQuestion();
            showButtons();
            $("#victory").empty();
        }).fail(function(err) {
            throw err;
        });
    }

    function showQuestion() {
        $("#question").html("Question: " + question);
        $("#category").html("Category: " + category);
    }

    function showButtons() {
        $(".list-group").empty();
        for ( i = 0; i < choices.length; i++) {
            var btn = $("<button>");
            btn.addClass("options");
            btn.attr("id", "btn" + i);
            btn.attr("data-name", choices[i]);
            btn.text(choices[i]);
            $(".list-group").append(btn);
        }
    }

    function displayAnswer() {
        if ( time === 0 ) {
            $("#timer").html("<h3>Times Up!</h3>");
            loss();
            timeOut();
        } else if ( userGuess == correct ) {
            clearScreen();
            correctAns++;
            stewie = "assets/images/stewie.jpg";
            img = $("<img>");
            img.attr("src", stewie);
            $("#victory").append(img);
            timeOut();
        } else if ( userGuess !== correct ) {
            loss();
            timeOut();
        }
        totalQs++;
    }

    function clearScreen() {
        $(".list-group").empty();
        $("#question").empty();
        $("#category").empty();
        $("#timer").empty();
        choices = [];
    }

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }
    
    function decrement() {
        time--;
        $("#timer").html("Time Left: " + time);
        if ( time === 0) {
            stop();
            displayAnswer();
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    function timeOut() {
        windowTimeout = setTimeout(function() {
            getAPI();
            time = 20;
            run();
        }, 3000);
    }

    function loss() {
        clearScreen();
        getGiphy();
    }

    function endGame() {
        if ( totalQs === gameLength ) {
            clearScreen();
            $("#victory").html("Game Over!<br>You Scored " + correctAns + " Out of " + totalQs);
            clearTimeout(windowTimeout);
            restartGame();
        }
    }

    function restartGame() {
        totalQs = 0;
        correctAns = 0;
        clicks = -1;
        var btn = $("<button>");
        btn.attr("id", "start");
        btn.text("Restart Game!")
        $(".list-group").append(btn);
    }
    
    $("#buttonDiv").on("click", "button", function(event) {
        event.preventDefault();
        if ( clicks === 0 ) {
            $("#victory").empty();
            $("#categoryDiv").empty();
            $("#difficultyDiv").empty();
            $(".list-group").empty();
            getAPI();$(document).ready(function() {

    var choices = [];
    var question;
    var correct;
    var incorrect;
    var category;
    var userGuess;
    var clicks = 0;
    var gameLength = 10;
    var time = 20;
    var intervalId;
    var correctAns = 0;
    var totalQs = 0;
    var windowTimeout;

    function getGiphy() {
        var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=no";
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            var noGif = $("<img>");
            noGif.attr("src", results.images.fixed_height.url);
            $("#victory").append(noGif);
        })
    }
    

    function getAPI() {
        var queryURL = "https://opentdb.com/api.php?amount=1&type=multiple";
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var options = [];
            var indexChecker = [ 0, 1, 2, 3];
            var help = response.results[0];
            question = decodeURIComponent(help.question);
            correct = decodeURIComponent(help.correct_answer);
            incorrect = help.incorrect_answers;
            category = decodeURIComponent(help.category);
            options.push(correct);
            for ( i = 0; i < incorrect.length; i++) {
                options.push(decodeURIComponent(incorrect[i]));
            }
            for ( i = 0; i < 4; i++) {
                num = Math.floor(Math.random() * (indexChecker.length - 1))
                randomIndex = indexChecker[num];
                choices[randomIndex] = options[i];
                indexChecker.splice(num, 1);
            }
            showQuestion();
            showButtons();
            $("#victory").empty();
        }).fail(function(err) {
            throw err;
        });
    }

    function showQuestion() {
        $("#question").html("Question: " + question);
        $("#category").html("Category: " + category);
    }

    function showButtons() {
        $(".list-group").empty();
        for ( i = 0; i < choices.length; i++) {
            var btn = $("<button>");
            btn.addClass("options");
            btn.attr("id", "btn" + i);
            btn.attr("data-name", choices[i]);
            btn.text(choices[i]);
            $(".list-group").append(btn);
        }
    }

    function displayAnswer() {
        if ( time === 0 ) {
            $("#timer").html("<h3>Times Up!</h3>");
            loss();
            timeOut();
        } else if ( userGuess == correct ) {
            clearScreen();
            correctAns++;
            stewie = "assets/images/stewie.jpg";
            img = $("<img>");
            img.attr("src", stewie);
            $("#victory").append(img);
            timeOut();
        } else if ( userGuess !== correct ) {
            loss();
            timeOut();
        }
        totalQs++;
    }

    function clearScreen() {
        $(".list-group").empty();
        $("#question").empty();
        $("#category").empty();
        $("#timer").empty();
        choices = [];
    }

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }
    
    function decrement() {
        time--;
        $("#timer").html("Time Left: " + time);
        if ( time === 0) {
            stop();
            displayAnswer();
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    function timeOut() {
        windowTimeout = setTimeout(function() {
            getAPI();
            time = 20;
            run();
        }, 3000);
    }

    function loss() {
        clearScreen();
        getGiphy();
    }

    function endGame() {
        if ( totalQs === gameLength ) {
            clearScreen();
            $("#victory").html("Game Over!<br>You Scored " + correctAns + " Out of " + totalQs);
            clearTimeout(windowTimeout);
            restartGame();
        }
    }

    function restartGame() {
        totalQs = 0;
        correctAns = 0;
        clicks = -1;
        var btn = $("<button>");
        btn.attr("id", "start");
        btn.text("Restart Game!")
        $(".list-group").append(btn);
    }
    
    $("#buttonDiv").on("click", "button", function(event) {
        event.preventDefault();
        if ( clicks === 0 ) {
            $("#victory").empty();
            $("#categoryDiv").empty();
            $("#difficultyDiv").empty();
            $(".list-group").empty();
            getAPI();
            run();
        } else {
            $("#victory").empty();
            userGuess = $(this).attr("data-name");
            displayAnswer();
            stop();
            endGame();
        }
        clicks++
    })

    $("#categoryDiv").on("click", function(event) {
        event.preventDefault();
        // categoryPicked = $(this).attr("data-name");
        // console.log(categoryPicked);
    })

    $("#difficultyDiv").on("click", function(event) {
        event.preventDefault();
    })
})
            run();
        } else {
            $("#victory").empty();
            userGuess = $(this).attr("data-name");
            displayAnswer();
            stop();
            endGame();
        }
        clicks++
    })

    $("#categoryDiv").on("click", function(event) {
        event.preventDefault();
        // categoryPicked = $(this).attr("data-name");
        // console.log(categoryPicked);
    })

    $("#difficultyDiv").on("click", function(event) {
        event.preventDefault();
    })
})