$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyDmO_SXokLW_erFpIfeBSEP0U81glGSRCk",
    authDomain: "shared-tasklist.firebaseapp.com",
    databaseURL: "https://shared-tasklist.firebaseio.com",
    projectId: "shared-tasklist",
    storageBucket: "",
    messagingSenderId: "655754054371"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#task-in").on("click",function(){
    event.preventDefault();
    var m = moment();
    var newTask = $("#new-task").val().trim();

    database.ref("/onTheDocket").push({
      task: newTask,
      added: m.format("DD/MM/YY"),
      rating: 0,
    });

    $("#new-task").val("");
  })

  database.ref("/onTheDocket").on("child_added", function(snapshot){
      var sv = snapshot.val();
      var taskId = snapshot.key;

      var taskDiv = $("<div>");
      taskDiv.attr("id", taskId);

      var doneBtn = $("<button>");
      doneBtn.attr("value", taskId);
      doneBtn.html("Done");

      var deleteBtn = $("<button>");
      deleteBtn.attr("value", taskId);
      deleteBtn.html("X");

      var rateupBtn = $("<button>");
      rateupBtn.attr("value", taskId);
      rateupBtn.html("+");

      var ratedownBtn = $("<button>");
      ratedownBtn.attr("value", taskId);
      ratedownBtn.html("-");

      taskDiv.html(sv.task);
      taskDiv.prepend(doneBtn);
      taskDiv.append(deleteBtn);
      taskDiv.append(rateupBtn);

      $("#task-view").append(taskDiv);
  })
})

/*<div class="btn-group">
  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
    Rating <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <li id="plus2">+2</li>
    <li id="plus1">+1</li>
    <li id="neg1">-1</li>
    <li id="neg2">-2</li>
  </ul>
</div>
*/
