/*global $*/


$(document).ready(function() {
  var username;
  function refresh() {
    // $("#chatBox").ready(function(e) {
    // window.setInterval(function(){
    /// call your function here
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
    // }, 5000);
    // });
  }

  $("#chatBox").ready(function(e) {
    refresh();
    window.setInterval(function() {
      refresh();
    }, 1000);
  });


  $("#sendButton").click(function(e) {
    if ($("#Message").val().length) {
      var myobj = { Username: $("#Username").val(), Message: $("#Message").val() };
      var jobj = JSON.stringify(myobj);
      // $("#json").text(jobj);
      var url = "messages";
      $.ajax({
        url: url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus) {
          $("#Message").val("");
          // e.preventDefault();   
        }
      });
    }
  });

  $("#deleteComments").click(function() {
    var url = "comment";
    $.ajax({
      url: url,
      type: "DELETE",
      // data: jobj,
      // contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        // $("#done").html(textStatus);
        console.log("delete worked! (comments.js)");
        $("#comments").html("");
        $("#json").text("");
      }
    });
  });

});
