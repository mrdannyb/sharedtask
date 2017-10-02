var ravens = ["danny","miyuki","tescia","nauhi","mel","lorrie","donkey","lala","naomi","chris","maya"]

$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyDmO_SXokLW_erFpIfeBSEP0U81glGSRCk",
    authDomain: "shared-tasklist.firebaseapp.com",
    databaseURL: "https://shared-tasklist.firebaseio.com",
    projectId: "shared-tasklist",
    storageBucket: "shared-tasklist.appspot.com",
    messagingSenderId: "655754054371"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#task-in").on("click",function(){
    event.preventDefault();
    var m = moment();
    var newTask = $("#new-task").val().trim();
    if (newTask != ""){
      database.ref("onTheDocket").push({
        task: newTask,
        added: m.format("MMM Do YYYY"),
        rating: 0,
      });
    }

    $("#new-task").val("");
  });

 /* $("register")
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  firebase.auth().signOut().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;  
  });
*/

  database.ref("onTheDocket").on("child_added", function(snapshot){
    var sv = snapshot.val();
    var taskId = snapshot.key;

    var taskDiv = $("<div>");
    taskDiv.attr("id", taskId);
    taskDiv.addClass("container-fluid bg-faded task");

    var doneBtn = $("<button>");
    doneBtn.attr("value", taskId);
    doneBtn.html("Done");
    doneBtn.addClass("doneBtn divBtn btn btn-success");

    var deleteBtn = $("<button>");
    deleteBtn.attr("value", taskId);
    deleteBtn.html("X");
    deleteBtn.addClass("delBtn divBtn btn btn-danger")

    var rateupBtn = $("<button>");
    rateupBtn.attr("value", taskId);
    rateupBtn.attr("data-rate", 1);
    rateupBtn.addClass("divBtn rate btn btn-info");
    rateupBtn.html("+");


    var ratedownBtn = $("<button>");
    ratedownBtn.attr("value", taskId);
    ratedownBtn.html("-");
    ratedownBtn.attr("data-rate",-1);
    ratedownBtn.addClass("divBtn rate btn btn-warning");

    var dateSpan = $("<span>");
    dateSpan.html(sv.added);
    dateSpan.addClass("text-info");

    taskDiv.html(sv.task);
    taskDiv.prepend(doneBtn);
    taskDiv.append(deleteBtn);
    taskDiv.append(rateupBtn);
    taskDiv.append(ratedownBtn);
    taskDiv.append(dateSpan);


    $("#task-view").append(taskDiv);
  });

  $(document).on("click", ".delBtn", function(){
    var delId = $(this).attr("value");
    database.ref("onTheDocket/" + delId).once("value", function(snap){
      var sv = snap.val();
      database.ref("trashedTasks").push(sv);
      database.ref("onTheDocket").child(delId).remove();
      $("#" + delId).remove();
    });
  });


  $(document).on("click", ".doneBtn", function(){
    var doneId = $(this).attr("value");
    database.ref("onTheDocket/" + doneId).once("value", function(snap){
      var sv = snap.val();
      database.ref("completedTasks").push(sv);
      database.ref("onTheDocket").child(doneId).remove();
      $("#" + doneId).remove();
    });
  });


});



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
