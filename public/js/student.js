$(document).ready(function(){

    //STUDENT QUIZ KEY
    //==================
    $("#inputkey").on("click", function(event){
        event.preventDefault()
        let inputKey = $("#inputkey").val().trim(),
        
        if(inputKey){
        


        } else {
            console.log("quiz authorization key is not correct")
        }
    })

////if student quiz key is success trigger student login modal 

    //STUDENT LOGIN
    //==================
    $("#studentloginbtn").on("click", function(event){
        event.preventDefault()
        let studentUsername = $("#studentUsername").val().trim(),
            studentPassword = $("#inputPassword").val().trim()
        // if there are values 
        if (studentUsername && studentPassword){
            var studentLogin = {
            username : studentUsername,
            password : studentPassword
            }
            $.get("/studentLogin", studentLogin, function(data){
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


////if login = success, show waiting page 

/////once teacher starts quiz, trigger trivia game function
    // GAME FUNCTION (STUDENT)
    //==================
    
    //include set interval timer
    //get questions and answers from quiz json object 
    //loop through and render buttons with associated values on student page 
    //check if each answer is correct after each question.
        //if correct, score++
        //call next question - repeat loop through all questions selected 
    //at conclusion of game, display the score for the student in results div


})