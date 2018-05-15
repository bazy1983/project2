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
            console.log("one or more fields is empty")
        }
    })

    
})