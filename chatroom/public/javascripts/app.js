/*global $*/

$(document).ready(function() {
  
  $("#chatBox").ready(function(e) {
    var URL = "messages";
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var message in data) {
        var mess = data[message];
        everything += "<li> <div><span style='font-weight:bold'>" + mess.Username + "</span><br> " + mess.Message + "<div></li>";
      }
      everything += "</ul>";
      // console.log("everything: ", everything);
      $("#chatBox").html(everything);
      $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);
    });
  });

  
  $("#sendButton").click(function(e) {
      if($("#Message").val().length){
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


// var app = window.angular.module('app', [])

// app.factory('messageFetcher', messageFetcher)
// app.controller('mainCtrl', mainCtrl)

// function messageFetcher ($http) {

//   var API_ROOT = '/messages'
//   return {
//     get: function () {
//       return $http
//         .get(API_ROOT)
//         .then(function (resp) {
//           return resp.data
//         })
//     }
//   }

// }

// function mainCtrl ($scope, messageFetcher, $http) {
//   $scope.messages = []

//   messageFetcher.get()
//     .then(function (data) {
//       $scope.messages = data
//       console.log("messages: ", data);
//     })
    
//     $scope.addSong = function() {
//       var formData = {name:$scope.Name,artist:$scope.Artist};
//       console.log(formData);
//       var songURL = 'songs';
//       $http({
//         url: songURL,
//         method: "POST",
//         data: formData
//       }).success(function(data, status, headers, config) {
//         console.log("Post worked");
//         $scope.songs.push(data);
//         $scope.Name = "";
//         $scope.Artist = "";
//       }).error(function(data, status, headers, config) {
//         console.log("Post failed");
//         $scope.Name = "";
//         $scope.Artist = "";
//         alert("Please enter valid song and artist combination.");
//       })
//       ;
//     }
    
//     $scope.deleteSong = function(song) {
//       var songData = {name:song.name,artist:song.artist};
//       // var index = $scope.songs.indexOf(song);
//       var songURL = 'deleteSong';
//       $http({
//         url: songURL,
//         method: "POST",
//         data: songData
//       }).success(function(data, status, headers, config) {
//         console.log("Post worked");
//         $scope.songs.splice(Number(data), 1);
//       }).error(function(data, status, headers, config) {
//         console.log("Post failed");
//       })
//     };
    
//     $scope.openURLinNewTab = function(song) {
//       window.open(song.trackUrl);
//     };
    
// }