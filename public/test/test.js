$(document).ready(function () {
    var socket = io();
    $("#teacherlogin").on("click", function () {
        var user = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        }
        $.get("/teacherLogin", user, function (data) {
            console.log(data)
        })
    })


    $("#sessionID").on("click", function () {
        var newRandom = Math.floor(Math.random()*1000000);
        $("#sessionNumber").text(newRandom);
        $.post("/sessionId", {session: newRandom}, function(){
            console.log("new session id sent to server")
        })
    })





})