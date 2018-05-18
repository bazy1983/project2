
    var socket = io(); // websocket connection
    //STUDENT QUIZ KEY
    //==================
    $("#inputkey").on("click", function (event) {
        event.preventDefault()
        let inputKey = $("#inputkey").val().trim();

        if (inputKey) {

            console.log("it's not empty")

        } else {
            console.log("quiz authorization key is not correct")
        }
    })

    ////if student quiz key is success trigger student login modal 

    //STUDENT LOGIN
    //==================
    $("#studentloginbtn").on("click", function (event) {
        event.preventDefault()
        let studentUsername = $("#studentUsername").val().trim(),
            studentPassword = $("#inputPassword").val().trim()
        // if there are values 
        if (studentUsername && studentPassword) {
            var studentLogin = {
                username: studentUsername,
                password: studentPassword
            }
            $.get("/studentLogin", studentLogin, function (data) {
                console.log(data)
                //some dom manipulation
            })
                .fail(function (err) {
                    if (err.status === 403) {
                        console.log(err.responseJSON)
                    } else {
                        //404 not found
                        console.log(err.responseJSON)
                    }
                })
        } else {
            console.log("form must be filled in")
        }
    })


    ////if login = success, show waiting page 


    //input session id 
    $("#sessionEntry").on("click", function (e) {
        e.preventDefault();
        console.log("clicked")
        let studentSessionId = {sessionId : $("#inputkey").val().trim() + "student"};
        sessionStorage.setItem("studentSession", $("#inputkey").val().trim() + "student")
        sessionStorage.setItem("teacherSession", $("#inputkey").val().trim() + "teacher")
        socket.emit("studentSocket", studentSessionId);

        socket.on(sessionStorage.getItem("teacherSession"), function (data) {
            $(".quiz-buttons").empty();
            console.log("Student view listening to teacher")
            console.log(data)
            //append buttons
            let answerOne = $("<button question = '"+data.id+"' choice = '"+1+"' correct = '"+data.correct_answer+"'>").text("A"),
            answertwo = $("<button question = '"+data.id+"' choice = '"+2+"' correct = '"+data.correct_answer+"'>").text("B"),
            answerthree = $("<button question = '"+data.id+"' choice = '"+3+"' correct = '"+data.correct_answer+"'>").text("C"),
            answerfour = $("<button question = '"+data.id+"' choice = '"+4+"' correct = '"+data.correct_answer+"'>").text("D");
            $(".quiz-buttons").append(answerOne, answertwo, answerthree, answerfour);
            
        })
    })
    var studentAnswers = [];
    //pushing student object needs work
    $(".quiz-buttons").on("click", "button", function(){
        console.log($(this).attr("choice"))
        let answersObj = {
            questionID : $(this).attr("question"),
            studentAnswer : $(this).attr("choice"),
        };
        if($(this).attr("choice") == $(this).attr("correct")){
            answersObj.isCorrect = true;
        } else {
            answersObj.isCorrect = false;
        }
        studentAnswers.push(answersObj);
        console.log(studentAnswers)
    })



    


    /////once teacher starts quiz
    // GAME FUNCTION (STUDENT)
    //==================


    //get questions and answers from quiz json object 
    //loop through and render buttons with associated values on student page 
    //check if each answer is correct after each question.
    //if correct, score++
    //call next question - repeat loop through all questions selected 
    //at conclusion of game, display the score for the student in results div



