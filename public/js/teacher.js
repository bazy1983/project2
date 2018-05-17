$(document).ready(function () {

    var socket = io(); // websocket connection
    //TEACHER LOGIN

    // BEGIN LOAD LOGIN IN DASHBOARD
    $(window).on("load", function () {
        $("#teacherLogin").modal("show");


        // CLOSE LOAD LOGIN IN DASHBOARD

        //==================

        $("#teacherloginbtn").on("click", function (event) {
            event.preventDefault()
            let teacherUsername = $("#loginUsername").val().trim(),
                teacherPassword = $("#loginPassword").val().trim()
            // if there are values 
            if (teacherUsername && teacherPassword) {
                
                var teacherLogin = {
                    username: teacherUsername,
                    password: teacherPassword
                }
                $.get("/teacherLogin", teacherLogin, function (data) {
                    console.log(data)
                    sessionStorage.setItem("id", data.id); // use it later on for test session
                    $('#teacherLogin').modal('hide')
                    //some dom manipulation
                })
                    .fail(function (err) {
                        if (err.status === 403) {
                            // console.log(err.responseJSON)

                        } else {
                            //404 not found
                            // console.log(err.responseJSON)

                        }
                    })
            } else {
                console.log("form must be filled in")
                $("#errorMessage").text("form must be filled in")
            }
        })
    });


    //TEACHER REGISTRATION
    //=========================
    $("#teacherSignUpbtn").on("click", function (event) {
        event.preventDefault();
        let newTeacherFname = $("#first_name").val().trim(),
            newTeacherLname = $("#last_name").val().trim(),
            newTeacherEmail = $("#email").val().trim(),
            newTeacherUsername = $("#registerUsername").val().trim(),
            newTeacherPassword = $("#registerPassword").val().trim(),
            newTeacherToken = $("#authtoken").val().trim();
        //check if all fields are filled in
        if (newTeacherFname && newTeacherLname && newTeacherEmail && newTeacherUsername && newTeacherPassword && newTeacherToken) {
            let newRegistration = {
                first_name: newTeacherFname,
                last_name: newTeacherLname,
                email: newTeacherEmail,
                username: newTeacherUsername,
                password: newTeacherPassword,
                token: newTeacherToken
            };
            $.post("/teacherSignUp", newRegistration, function (data) {
                console.log(data)
                //display message
            }).fail(function (err) {
                console.log("Token error")
            })
        } else {
            console.log("one or more fields are empty")
        }
    })

    //ADD NEW QUESTION
    //==================
    var questionCategory;

    //build topic dropdown
    $("#addNewQuestionCollapse").on("click", function () {
        $.get("/questionCategories", function (data) {
            //build category dropdown list
            //console.log(data);
            $("#all-topics").empty();
            for (let i = 0; i < data.length; i++) {
                $("#all-topics").append($("<option value = '" + data[i].id + "'>").text(data[i].topic_name))
            }
        })
    })

    $("#addNewQuestionbtn").on("click", function (event) {
        event.preventDefault();
        let newQuestion = $("#new-question").val().trim(),
            newAnswerA = $("#answer1").val().trim(),
            newAnswerB = $("#answer2").val().trim(),
            newAnswerC = $("#answer3").val().trim(),
            newAnswerD = $("#answer4").val().trim(),
            newCorrect = $("#correct-answer").val();
        var newTopic = $("#new-topic").val().trim();
        var existingTopic = $(".existingTopicNewQuestion").val();
        if (newQuestion && newAnswerA && newAnswerB && newAnswerC && newAnswerD && newCorrect) {
            let question = {
                question_text: newQuestion,
                answer1: newAnswerA,
                answer2: newAnswerB,
                answer3: newAnswerC,
                answer4: newAnswerD,
                correct_answer: newCorrect
            };
            //if new topic is created
            if (newTopic) {
                //post new topic then post question with new topic
                $.post("/create-new-topic", { topic_name: newTopic }, function (dbTopic) {
                    //console.log(dbTopic)
                    question.topicId = dbTopic.id
                    $.post("/create-new-question", question, function (data) {
                        //console.log(data)
                    })
                })
                //else use existing topic
            } else {
                question.topicId = existingTopic;
                $.post("/create-new-question", question, function (data) {
                    //console.log(data)
                })
            }
        } else {
            console.log("one or more fields are not filled in")
        }
    })

    // DASHBOARD TOGGLE STUFF HERE

    // BEGIN START QUIZ 
    var sendSessionQuestion; //that to set socket.io keyword in server
    $("#sessionID").on("click", function () {
        let newRandom = Math.floor(Math.random() * 1000000);
        sendSessionQuestion = newRandom + "teacher";
        sessionStorage.setItem("session", sendSessionQuestion)
        $("#sessionNumber").text(newRandom);
        $.post("/sessionId", { session: newRandom }, function () {
            console.log("new session id sent to server")
        })
    })

    // END START QUIZ

    // BEGIN QUIZ RESULTS 
    // END QUIZ RESULTS 

    //MAKE NEW QUIZ
    //==================

    //build topic dropdown
    $("#makeNewTestCollapse").on("click", function () {
        $.get("/questionCategories", function (data) {
            //build category dropdown list
            // console.log(data);
            $("#all-topics-test").empty();
            for (let i = 0; i < data.length; i++) {
                $("#all-topics-test").append($("<option value = '" + data[i].id + "'>").text(data[i].topic_name))
            }
        })
    })
    //on topic dropdown change, grab all questions for that particular topic
    $(".newQuizTopic").on("change", function () {
        let topicId = $(".newQuizTopic").val()
        $.get("/allQuestionsForTopic/" + topicId, function (data) {
            // console.log(data)
            if (data) { //when array is not empty
                $("#questionTable").empty();
                for (let i = 0; i < data.length; i++) {
                    let tableRow = $("<tr dataID = '" + data[i].id + "'>");
                    let tableCount = $("<th>").text(i + 1)
                    let tableQuestion = $("<td>").text(data[i].question_text)
                    let tableInfo = tableRow.append(tableCount, tableQuestion)
                    $("#questionTable").append(tableInfo);
                }
            }
        })
    })

    //adding selected class to selected questions to build test
    $("#questionTable").on("click", "tr", function () {
        //console.log(this)
        $(this).toggleClass("RowSelected table-danger")
    })

    var questionJSON = []; //prepare question id array
    $(".composeTestBTN").on("click", function () {
        var allQuestions = $(".RowSelected");
        //console.log(allQuestions)
        for (let i = 0; i < allQuestions.length; i++) {
            questionJSON.push(allQuestions[i].attributes.dataid.value) //question id
        }
        let newTest = {
            userId: sessionStorage.getItem("id"), //get teacher id stored in sessionStorage
            question_ids: questionJSON,
            desc: $("#testDescription").val().trim(),
            secret_key: Math.floor(Math.random() * 10000)
        }

        $.post("/makeAtest", newTest, function (data) {
            // console.log(data);
        })
    })

    //get all tests created by a teacher
    $("#getAllTests").on("click", function () {
        let userID = sessionStorage.getItem("id");
        $("#testTable").empty();
        $.get("/getAllTests/" + userID, function (data) {
            for (let i = 0; i < data.length; i++) {
                let formatedDate = moment(data[i].createdAt).format("MMM Do YYYY");
                //console.log("date:" + formatedDate)
                let tableRow = $("<tr dataID = '" + data[i].id + "' secret = '"+data[i].secret_key+"'>");
                let tableCount = $("<th>").text(i + 1);
                let tableDesc = $("<td>").text(data[i].desc);
                let tableDate = $("<td>").text(formatedDate);
                let tableButton = $("<td><button class = 'viewQuestion btn btn-light'>View</button></td>");
                let tableInfo = tableRow.append(tableCount, tableDesc, tableDate, tableButton)
                $("#testTable").append(tableInfo);
            }
        })
    })

    //when clicking on view button
    $("#testTable").on("click", "td button", function () {
        var testID = $(this).parent().parent().attr("dataID");
        //query test table to get questions
        $.get("/testIdQuestions/" + testID, function (data) {
            //console.log(data);
            $.get("/questionsPerTest", { allIds: data.question_ids }, function (questionData) {
                //console.log(questionData);

            })
        })
    })
    //adding some classes to selected test table row, and remove them from its siblings
    $("#testTable").on("click", "tr", function(){
        $(this).toggleClass("testSelected table-warning").siblings().removeClass("testSelected table-warning");
    })

    var questions;
    $("#startNewSession").on("click", function(){
        var selectedTestId = $(".testSelected").attr("dataid");
        console.log(selectedTestId)
        $.get("/testIdQuestions/" + selectedTestId, function (data) {
            //console.log(data);
            $.get("/questionsPerTest", { allIds: data.question_ids }, function (questionData) {
                questions = questionData
                gameSession()

            })
        })
    })

    //question  recursive function
    var iterator = 0;
    function gameSession(){
        if(iterator === questions.length){
            clearInterval(timer)

            //end of quiz
            return
        }
        var counter = 10;
        var currentSessionID = sessionStorage.getItem("session")     
        console.log(questions[iterator])
        let oneQuestionAtTime = questions[iterator];
        oneQuestionAtTime.sessionID = currentSessionID
        //DOM display question
        // $.post("/questionToStudent", oneQuestionAtTime, function(){
        //     console.log("sent question to student")
        // })
        socket.emit("teacherSocket", oneQuestionAtTime)
        var timer = setInterval(function(){
            console.log("time: " + counter)
            counter--
            //DOM display counter
            if(counter < 0) {
                clearInterval(timer)
                console.log("Correct answer is: " + questions[iterator].correct_answer)
                //DOM display correct answer
                setTimeout(function(){
                    iterator++
                    gameSession()
                },2000)
            }
        }, 1000)

    }



})