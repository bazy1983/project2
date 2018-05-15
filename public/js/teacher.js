$(document).ready(function(){

    //TEACHER LOGIN
    //==================
    $("#teacherloginbtn").on("click", function(event){
        event.preventDefault()
        let teacherUsername = $("#loginUsername").val().trim(),
            teacherPassword = $("#loginPassword").val().trim()
        // if there are values 
        if (teacherUsername && teacherPassword){
            var teacherLogin = {
            username : teacherUsername,
            password : teacherPassword
            }
            $.get("/teacherLogin", teacherLogin, function(data){
                console.log(data)
                //some dom manipulation
            })
            .fail(function(err){
                if(err.status === 403){
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
            console.log(data);
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
        if(newQuestion && newAnswerA && newAnswerB && newAnswerC && newAnswerD && newCorrect){
            let question = {
                question_text : newQuestion,
                answer1 : newAnswerA,
                answer2 : newAnswerB,
                answer3 : newAnswerC,
                answer4 : newAnswerD,
                correct_answer : newCorrect
            };
            $.post("/create-new-topic", {topic_name : newTopic}, function(dbTopic){
                console.log(dbTopic)
                question.topicId = dbTopic.id
                $.post("/create-new-question", question, function(data){
                    console.log(data)
                })
            })
        } else {
            console.log("one or more fields are not filled in")
        }
    })

    
})