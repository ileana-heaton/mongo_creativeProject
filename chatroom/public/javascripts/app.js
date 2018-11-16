/*global $*/
/*global localStorage*/

var username = localStorage.getItem("username");
if(username == null) {
  username="";
}
// username = "";  

$(document).ready(function() {
  if(username.length==0){
    username = prompt("Please enter your username:", "");
    if (username == null) {
        username = ""
        console.log("no username entered");
    //     txt = "User cancelled the prompt.";
    } 
    else {
        console.log("username entered: ", username);
        localStorage.setItem("username", username);
    //     txt = "Hello " + person + "! How are you today?";
    }
  }
// <<<<<<< HEAD
// function refresh(){
//       var URL = "messages";
//       $.getJSON(URL, function(data) {
//         console.log(data);
//         var everything = "<ul>";
//         for(var message in data) {
//           var mess = data[message];
//           everything += "<li> <div><span style='font-weight:bold'>" + mess.Username + "</span><br> " + mess.Message + "<div></li>";
//         }
//         everything += "</ul>";
//         // console.log("everything: ", everything);
//         $("#chatBox").html(everything);
//         $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
//         // if(username.length){
//         //   $("#Username").val(username);
//         // }
//       });
// =======
  // var username;
  function refresh() {
    var URL = "messages";
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul>";
      for (var message in data) {
        var mess = data[message];
        var newTime = new Date(mess.time).toLocaleTimeString();
        everything += "<li> <div><span style='font-weight:bold'>" + mess.Username + "</span><br> " + mess.Message + "<div style='float: right'>" + newTime + "<div>" + "<div></li>";
      }
      everything += "</ul>";
      // console.log("everything: ", everything);
      $("#chatBox").html(everything);
      $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
    });
  }

  $("#chatBox").ready(function(e) {
    refresh();
    window.setInterval(function() {
      refresh();
    }, 1000);
  });
// <<<<<<< HEAD
  
  // $("#Username").keyup(function(){
  //   //save username here
  //   username = $("#Username").val();
  //   // console.log($("#Username").val());
  // });
  
  $("#newUsername").click(function(e) {
    username = prompt("Please enter a new username:", "");
    if (username == null) {
        username = ""
        console.log("no username entered");
    //     txt = "User cancelled the prompt.";
    } 
    else {
        console.log("username entered: ", username);
        localStorage.setItem("username", username);
    //     txt = "Hello " + person + "! How are you today?";
    }
  });

  
  $("#sendButton").click(function(e) {
    if(username.length==0){
      // window.alert("Please enter a username!");
      username = prompt("Please enter your username:", "");
      e.preventDefault();
      return;
    }
    if($("#Message").val().length){
      var myobj = { Username: username, Message: $("#Message").val() };
      // var myobj = { Username: $scope.username, Message: $("#Message").val() };
      var jobj = JSON.stringify(myobj);
      console.log("newmessage:", jobj);
      // $("#json").text(jobj);
      var url = "messages";
      $.ajax({
          url: url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data, textStatus) {
              $("#Message").val("");
              console.log("sent message worked");
              e.preventDefault();   
          }
      });
    }
  });
  
  // $("#deleteComments").click(function() {
  //   var url = "comment";
  //   $.ajax({
  //       url: url,
  //       type: "DELETE",
  //       // data: jobj,
  //       // contentType: "application/json; charset=utf-8",
  //       success: function(data, textStatus) {
  //           // $("#done").html(textStatus);
  //           console.log("delete worked! (comments.js)");
  //           $("#comments").html("");
  //           $("#json").text("");
  //       }
  //   });
  // });
  
});
// =======


//   $("#sendButton").click(function(e) {
//     if ($("#Message").val().length) {
//       var myobj = { Username: $("#Username").val(), Message: $("#Message").val() };
//       var jobj = JSON.stringify(myobj);
//       // $("#json").text(jobj);
//       var url = "messages";
//       $.ajax({
//         url: url,
//         type: "POST",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data, textStatus) {
//           $("#Message").val("");
//           // e.preventDefault();   
//         }
//       });
//     }
//   });
// >>>>>>> 20cc22c1b3dea8ddb4e8ed4cc58e05fe3e546671

  // $("#deleteComments").click(function() {
  //   var url = "comment";
  //   $.ajax({
  //     url: url,
  //     type: "DELETE",
  //     // data: jobj,
  //     // contentType: "application/json; charset=utf-8",
  //     success: function(data, textStatus) {
  //       // $("#done").html(textStatus);
  //       console.log("delete worked! (comments.js)");
  //       $("#comments").html("");
  //       $("#json").text("");
  //     }
  //   });
  // });

// });
