$(document).ready(function(){
    var socket = io(); // websocket connection
    // //STUDENT QUIZ KEY
    // //==================
    // $("#inputkey").on("click", function (event) {
    //     event.preventDefault()
    //     let inputKey = $("#inputkey").val().trim();

    //     if (inputKey) {

    //         console.log("it's not empty")

    //     } else {
    //         console.log("quiz authorization key is not correct")
    //     }
    // })

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
                //console.log(data)
                sessionStorage.setItem("id", data.id);
                sessionStorage.setItem("name", data.first_name + " " + data.last_name)
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


    //input session id and connect to teacher's session
    var studentAnswers = []; //student answers array of objects
    $("#sessionEntry").on("click", function (e) {
        e.preventDefault();
        console.log("clicked")
        let studentSessionId = {
            sessionId : $("#inputkey").val().trim() + "student",
            userId : sessionStorage.getItem("id"),
            name : sessionStorage.getItem("name")
        };
        sessionStorage.setItem("studentSession", $("#inputkey").val().trim() + "student");
        sessionStorage.setItem("teacherSession", $("#inputkey").val().trim() + "teacher");
        sessionStorage.setItem("endSession",  $("#inputkey").val().trim() + "end")
        //send student info to teacher's view
        socket.emit("studentSocket", studentSessionId);
        
        //get end from server
        socket.on(sessionStorage.getItem("endSession"), function(){
            let studentTest = {
                userId : sessionStorage.getItem("id"),
                session_id : $("#inputkey").val().trim(),
                student_result : studentAnswers
            }

            $.post("/storeStudentAnswers", studentTest, function(){
                console.log("results sent")
                //DOM show student results
            })
        })
        ////once teacher starts quiz
        // get questions from server
        socket.on(sessionStorage.getItem("teacherSession"), function (data) {
            console.log(data)// display question information
            //set new object with default values 
            let answersObj = {
                questionID : data.id,
                correct : data.correct_answer,
                answer : 0,
                isCorrect : false
            };
            studentAnswers.push(answersObj);
            $(".quiz-buttons").empty();
            //append buttons
            let answerOne = $("<button question = '"+data.id+"' choice = '"+1+"' correct = '"+data.correct_answer+"'>").text("A"),
            answertwo = $("<button question = '"+data.id+"' choice = '"+2+"' correct = '"+data.correct_answer+"'>").text("B"),
            answerthree = $("<button question = '"+data.id+"' choice = '"+3+"' correct = '"+data.correct_answer+"'>").text("C"),
            answerfour = $("<button question = '"+data.id+"' choice = '"+4+"' correct = '"+data.correct_answer+"'>").text("D");
            $(".quiz-buttons").append(answerOne, answertwo, answerthree, answerfour);
            console.log(studentAnswers)
        })
    })


    
    // GAME FUNCTION (STUDENT)
    //==================
    $(".quiz-buttons").on("click", "button", function(){
        console.log($(this).attr("choice"))
        let questionIndex = studentAnswers.length-1;
        console.log("index" + questionIndex)
        //change student answer from default (0), to the student choice 
        studentAnswers[questionIndex].answer = $(this).attr("choice")
        if($(this).attr("choice") == $(this).attr("correct")){
            studentAnswers[questionIndex].isCorrect = true;
        } else {
            studentAnswers[questionIndex].isCorrect = false;
        }
        console.log(studentAnswers)
        
    })





    


    
    //get questions and answers from quiz json object 
    //loop through and render buttons with associated values on student page 
    //check if each answer is correct after each question.
    //if correct, score++
    //call next question - repeat loop through all questions selected 
    //at conclusion of game, display the score for the student in results div


})
