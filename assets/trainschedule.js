/**
 * Created by elenastaylor on 3/21/17.
 */
    // Initialize Firebase
var config = {
        apiKey: "AIzaSyB7w61ekaZRWVROccO4kfNeE_yHKP7ARX4",
        authDomain: "train-schedule-2ddeb.firebaseapp.com",
        databaseURL: "https://train-schedule-2ddeb.firebaseio.com",
        storageBucket: "train-schedule-2ddeb.appspot.com",
        messagingSenderId: "27990243917"
    };
firebase.initializeApp(config);

var database = firebase.database();

nextArrival = function(first){

}

//Variables
$("#addTrain").on("click", function() {
    //User Input
    var trainName =  $('#trainName').val().trim();
    var trainDestination = $('#trainDestination').val().trim();
    var firstTrainTime = $('#trainTimeHour').val().trim() + ":" + $('#trainTimeMin').val().trim();
    var trainFrequency = $('#trainFrequency').val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

//Objests:
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrainAt: firstTrainTime,
        frequency: trainFrequency
    };

//Upload Data to Database
    database.ref().push(newTrain);

//Clear off the text-boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTimeHour").val("");
    $("#trainTimeMin").val("");
    $("#trainFrequency").val("");

    return false;

});

database.ref().on("child_added", function(snapshot, prevChildKey) {
    var newTrain = snapshot.val();
    console.log("Previous Post ID: " + prevChildKey);

    var tFrequency = parseInt(newTrain.frequency);
    var firstTime = newTrain.firstTrainAt;


    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Minute Until Train
    var tMinutesTillTrain = tFrequency;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    console.log("Train frequency: " + tFrequency);
    console.log("First Train : " + firstTime);


$("#trainList").append("<tr><td>" + newTrain.name+ "</td><td>" + newTrain.destination +"</td><td>" +
    newTrain.frequency + "min </td><td>" + moment(nextTrain).format("hh:mm") +"</td><td>" + tMinutesTillTrain +
    "min" +"</td></tr>");

});