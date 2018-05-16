$(document).ready(function(){

    //TEACHER LOGIN

   // BEGIN LOAD LOGIN IN DASHBOARD
    $(window).on("load", function(){
        $("#teacherLogin").modal("show");

    
    // CLOSE LOAD LOGIN IN DASHBOARD
 
    //==================
    
    $("#teacherloginbtn").on("click", function(event){
        event.preventDefault()
        let teacherUsername = $("#loginUsername").val().trim(),
            teacherPassword = $("#loginPassword").val().trim()
        // if there are values 
        if (teacherUsername && teacherPassword){
            console.log("line #20")
            var teacherLogin = {
            username : teacherUsername,
            password : teacherPassword
            }
            $.get("/teacherLogin", teacherLogin, function(data){
                console.log(data)
                sessionStorage.setItem("id", data.id) ; // use it later on for test session
                $('#teacherLogin').modal('hide')
                //some dom manipulation
            })
            .fail(function(err){
                if(err.status === 403){
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
    $("#teacherSignUpbtn").on("click",  function(event){
        event.preventDefault();
        let newTeacherFname = $("#first_name").val().trim(),
            newTeacherLname = $("#last_name").val().trim(),
            newTeacherEmail = $("#email").val().trim(),
            newTeacherUsername = $("#registerUsername").val().trim(),
            newTeacherPassword = $("#registerPassword").val().trim(),
            newTeacherToken = $("#authtoken").val().trim();
            //check if all fields are filled in
        if (newTeacherFname && newTeacherLname && newTeacherEmail && newTeacherUsername && newTeacherPassword && newTeacherToken){
            let newRegistration = {
                first_name : newTeacherFname,
                last_name : newTeacherLname,
                email : newTeacherEmail,
                username : newTeacherUsername,
                password : newTeacherPassword,
                token : newTeacherToken
            };
            $.post("/teacherSignUp", newRegistration, function(data){
                console.log(data)
                //display message
            }).fail(function(err){
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
    $("#addNewQuestionCollapse").on("click", function(){
        $.get("/questionCategories", function(data){
            //build category dropdown list
            //console.log(data);
            $("#all-topics").empty();
            for(let i = 0; i<data.length; i++){
                $("#all-topics").append($("<option value = '"+data[i].id +"'>").text(data[i].topic_name))
            }
        })
    })

    $("#addNewQuestionbtn").on("click", function(event){
        event.preventDefault();
        let newQuestion = $("#new-question").val().trim(),
            newAnswerA = $("#answer1").val().trim(),
            newAnswerB = $("#answer2").val().trim(),
            newAnswerC = $("#answer3").val().trim(),
            newAnswerD = $("#answer4").val().trim(),
            newCorrect = $("#correct-answer").val();
        var newTopic = $("#new-topic").val().trim();
        var existingTopic = $(".existingTopicNewQuestion").val();
        if(newQuestion && newAnswerA && newAnswerB && newAnswerC && newAnswerD && newCorrect){
            let question = {
                question_text : newQuestion,
                answer1 : newAnswerA,
                answer2 : newAnswerB,
                answer3 : newAnswerC,
                answer4 : newAnswerD,
                correct_answer : newCorrect
            };
            //if new topic is created
            if(newTopic){
                //post new topic then post question with new topic
                $.post("/create-new-topic", {topic_name : newTopic}, function(dbTopic){
                    //console.log(dbTopic)
                    question.topicId = dbTopic.id
                    $.post("/create-new-question", question, function(data){
                        //console.log(data)
                    })
                })
                //else use existing topic
            }else{
                question.topicId = existingTopic;
                $.post("/create-new-question", question, function(data){
                    //console.log(data)
                })
            }
        } else {
            console.log("one or more fields are not filled in")
        }
    })
// END TEACHER CREATES QUESTIONS 

// DASHBOARD TOGGLE STUFF HERE

// BEGIN START QUIZ 

$("#sessionID").on("click", function () {
    var newRandom = Math.floor(Math.random()*1000000);
    $("#sessionNumber").text(newRandom);
    $.post("/sessionId", {session: newRandom}, function(){
        console.log("new session id sent to server")
    })
})

// END START QUIZ

// BEGIN QUIZ RESULTS 
// END QUIZ RESULTS 
    
    //MAKE NEW QUIZ
    //==================

    //build topic dropdown
    $("#makeNewTestCollapse").on("click", function(){
        $.get("/questionCategories", function(data){
            //build category dropdown list
            // console.log(data);
            $("#all-topics-test").empty();
            for(let i = 0; i<data.length; i++){
                $("#all-topics-test").append($("<option value = '"+data[i].id +"'>").text(data[i].topic_name))
            }
        })
    })
    //on topic dropdown change, grab all questions for that particular topic
    $(".newQuizTopic").on("change", function(){
        let topicId = $(".newQuizTopic").val()
        $.get("/allQuestionsForTopic/" + topicId, function(data){
            // console.log(data)
            if(data){ //when array is not empty
                $("#questionTable").empty();
                for(let i = 0; i<data.length; i++){
                    let tableRow = $("<tr dataID = '"+data[i].id+"'>");
                    let tableCount = $("<th>").text(i+1)
                    let tableQuestion = $("<td>").text(data[i].question_text)
                    let tableInfo = tableRow.append(tableCount, tableQuestion)
                    $("#questionTable").append(tableInfo);
                }
            }
        })
    })

    //adding selected class to selected questions to build test
    $("#questionTable").on("click", "tr", function(){
        //console.log(this)
        $(this).toggleClass("RowSelected table-danger")
    })

    var questionJSON = [];
    $(".composeTestBTN").on("click", function(){
        var allQuestions = $(".RowSelected");
        //console.log(allQuestions)
        for(let i = 0; i < allQuestions.length; i ++){
            questionJSON.push({id : allQuestions[i].attributes.dataid.value})
        }
        let newTest = {
            userId : sessionStorage.getItem("id"),
            question_ids : questionJSON,
            desc : $("#testDescription").val().trim()
        }

        $.post("/makeAtest", newTest , function(data){
           // console.log(data);
        })
    })

    $("#getAllTests").on("click", function(){
        let userID = sessionStorage.getItem("id");
        $.get("/getAllTests/"+ userID, function(data){
            for (let i = 0; i <data.length; i++){
                let tableRow = $("<tr dataID = '"+data[i].id+"'>");
                    let tableCount = $("<th>").text(i+1);
                    let tableDesc = $("<td>").text(data[i].desc);
                    let tableDate = $("<td>").text(data[i].createdAt);
                    let tableInfo = tableRow.append(tableCount, tableDesc, tableDate)
                    $("#testTable").append(tableInfo);
            }
        })
    })

    $("#testTable").on("mouseenter", "tr", function(){
        var testID = $(this).attr("dataID");
        
    })


})