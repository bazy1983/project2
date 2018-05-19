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
                console.log(data)
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
    //calculate time difference between question start and click the button
    var timeBeforeClick; 
    var timeAfterClick;
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
        sessionStorage.setItem("endSession",  $("#inputkey").val().trim() + "end");
        sessionStorage.setItem("answeredSession",  $("#inputkey").val().trim() + "answered")
        sessionStorage.setItem("pauseSession",  $("#inputkey").val().trim() + "pause");
        //send student info to teacher's view
        socket.emit("studentSocket", studentSessionId);
        
        //get end from server
        socket.on(sessionStorage.getItem("endSession"), function(data){
            let studentTest = {
                userId : sessionStorage.getItem("id"),
                session_id : $("#inputkey").val().trim(),
                student_result : studentAnswers,
                teacherId : data
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
                isCorrect : false,
                clickingTime : 10000
            };
            studentAnswers.push(answersObj);
            $(".quiz-buttons").empty();
            //append buttons
            let answerOne = $("<button question = '"+data.id+"' choice = '"+1+"' correct = '"+data.correct_answer+"'>").text("A"),
            answertwo = $("<button question = '"+data.id+"' choice = '"+2+"' correct = '"+data.correct_answer+"'>").text("B"),
            answerthree = $("<button question = '"+data.id+"' choice = '"+3+"' correct = '"+data.correct_answer+"'>").text("C"),
            answerfour = $("<button question = '"+data.id+"' choice = '"+4+"' correct = '"+data.correct_answer+"'>").text("D");
            $(".quiz-buttons").append(answerOne, answertwo, answerthree, answerfour);
            timeBeforeClick = new Date();
            console.log(timeBeforeClick)
        })

        //during the 2 second pause listen for pause to disable buttons
        socket.on(sessionStorage.getItem("pauseSession"), function(){
            //here where we disapble buttons
            console.log("disabled")
        })
    })


    // GAME FUNCTION (STUDENT)
    //==================
    $(".quiz-buttons").on("click", "button", function(){
        timeAfterClick = new Date();
        let deltaTime = timeAfterClick - timeBeforeClick; //calculating time it took student to answer the question
        console.log($(this).attr("choice"))
        let sendAnswer = {
            userID : sessionStorage.getItem("id"),
            answeredSession : sessionStorage.getItem("answeredSession")
        }
        socket.emit("answered", sendAnswer)
        let questionIndex = studentAnswers.length-1;//tracking the current default answer
        //change student answer from default (0), to the student choice 
        studentAnswers[questionIndex].answer = $(this).attr("choice")
        studentAnswers[questionIndex].clickingTime = deltaTime
        if($(this).attr("choice") == $(this).attr("correct")){
            studentAnswers[questionIndex].isCorrect = true;
        } else {
            studentAnswers[questionIndex].isCorrect = false;
        }
        console.log(studentAnswers)  
    })

    //SCROLL MAGIC FUNCTIONALITY 
    //==========================
    
    //FOR MOBILE 
    if ($(window).width() < 1024) {
     // alert('mobile');
        $('#fullpage').fullpage({
        autoScrolling: false,    //scroll
        verticalCentered: false  //flex
    });
    
    // sidebar link smooth scroll to each div in mobile
    var heroLink = $('#link-hero');
    var hero = $('#hero');
    var oneLink = $('#link-one');
    var one = $('#one');
    var twoLink = $('#link-two');
    var two = $('#two');
    var threeLink = $('#link-three');
    var three = $('#three');
    var fourLink = $('#link-four');
    var four = $('#four');

    heroLink.on('click', function(){
        $('html, body').animate({
        scrollTop: hero.offset().top
      }, 1000)
    });
    oneLink.on('click', function(){
        $('html, body').animate({
        scrollTop: one.offset().top
      }, 1000)
    });
    twoLink.on('click', function(){
        $('html, body').animate({
        scrollTop: two.offset().top
      }, 1000)
    });
    threeLink.on('click', function(){
        $('html, body').animate({
        scrollTop: three.offset().top
      }, 1000)
    });
    fourLink.on('click', function(){
        $('html, body').animate({
        scrollTop: four.offset().top
    }, 1000)
    });
    }  
  
    ////DESKTOP VIEW 
    else {
     //alert('desktop'); 
        $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
        autoScrolling: true,      //scroll
        verticalCentered: false   //flex
        });
    }

  // scroll magic
  var controller = new ScrollMagic.Controller();

  //mobile hero
  var mobileHero = new ScrollMagic.Scene({
    triggerElement: '#hero',
    duration: '100%',
    triggerHook: 0, //position trigger
    reverse: true, //animation always
  })
  .setClassToggle('#link-hero', 'link-active')
  .addIndicators({
    colorTrigger: 'black',
    colorStart: '#000',
  })
  .addTo(controller);

  //one
  var mobileOne = new ScrollMagic.Scene({
    triggerElement: '#one',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#link-one', 'link-active')
  .addTo(controller);
  
  // two
  var mobileTwo = new ScrollMagic.Scene({
    triggerElement: '#two',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#link-two', 'link-active')
  .addTo(controller);
  // three
  var mobileThree = new ScrollMagic.Scene({
    triggerElement: '#three',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#link-three', 'link-active')
  .addTo(controller);

   // four
  var mobileFour = new ScrollMagic.Scene({
    triggerElement: '#four',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#link-four', 'link-active')
  .addTo(controller);

    


  //desktop hero
  var desktopHero = new ScrollMagic.Scene({
    triggerElement: '#hero',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#menu-hero', 'link-active')
  .addTo(controller);
  
  // one
  var desktopOne = new ScrollMagic.Scene({
    triggerElement: '#one',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#menu-one', 'link-active')
  .addTo(controller);

  // two
  var desktopTwo = new ScrollMagic.Scene({
    triggerElement: '#two',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#menu-two', 'link-active')
  .addTo(controller);

  // three
  var desktopThree = new ScrollMagic.Scene({
    triggerElement: '#three',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#menu-three', 'link-active')
  .addTo(controller);

  // four
  var desktopFour = new ScrollMagic.Scene({
    triggerElement: '#four',
    duration: '100%',
    triggerHook: 0, 
    reverse: true, 
  })
  .setClassToggle('#menu-four', 'link-active')
  .addTo(controller);
  
});
