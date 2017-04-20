let users = ["freecodecamp", "timthetatman", "OgamingSC2", "habathcx", "RobotCaleb", "brunofin", "noobs2ninjas", "cretetion", "esl_sc2"];

const streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
const channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";
let isStreaming;
loadApi();

function loadApi() {

  for (var i = 0; i < users.length; i++) { //loop through users we want to display

    $.ajax({
      url: streamUrl + users[i], //First call is to check if stream is online
      dataType: "jsonp",
      type: "GET",
      headers: {
        "Api-User-Agent": "Example/1.0"
      },

      success: function(data) {
        console.log(data.stream);

        if (data.stream) {
          isStreaming =true;

        } else {
          isStreaming = false;
        }


      }
    });

    $.ajax({
      url: channelUrl + users[i] + '?callback=?', //second call is to the channels as this is how I get information of offline users.
      dataType: "jsonp",
      type: "GET",
      headers: {
        "Api-User-Agent": "Example/1.0"
      },

      success: function(data2) {

        let title = data2.display_name;
        let channelName = data2.name
        let logo = data2.logo;
        let status = data2.status;
        let game = data2.game;
        let channelStatus1 = "Online";
        let color1 = "green";
        let channelStatus = "Offline";
        let color = "red";

        if (isStreaming === true) {

//If user is online display online+green background



          $('#channels').append('<div class="col-xs-12 streamer ' + color1 + '">' +
            '<img src="' + logo + '" alt="" class="sImage pull-left" />' + '<h3 class="pull-left sName">' +
            "<a href='https://www.twitch.tv/" + channelName + "' target= '_blank'>" + title + "</a>" + "</h3>" +
            "<a href='https://www.twitch.tv/" + channelName + "' class='pull-right sStatus'>" +
            channelStatus1 + " </a>" + "</div>" + "<div class='col-xs-12 streamerInfo " +
            color1 + "'>" + "<p class='pull-left'>" + "<strong>Channel Info: </strong>" +
            status + "</p>" + "</div>");

        } else if (data2.error) { //if user no longer exists, display message

          $('#channels').append('<div class="col-xs-12 streamer gray">' +
            '<img src="' + "http://placehold.it/60x60" + '" alt="" class="sImage pull-left" />' +
            '<h3 class="pull-left sName">' + data2.message + "</h3>" +
            "</div>" +
            "<div class='col-xs-12 streamerInfo gray'>" + "<p class='pull-left '>" +
            "<strong>Channel Info:" + "</strong>" + " Account Closed" + "</p>" +
            "</div>" + "</div>");

        } else if (isStreaming === false) {

//If user is online display offline+red background

          $('#channels').append('<div class="col-xs-12 streamer ' + color + '">' +
            '<img src="' + logo + '" alt="" class="sImage pull-left" />' + '<h3 class="pull-left sName">' +
            "<a href='https://www.twitch.tv/" + channelName + "' target= '_blank'>" + title + "</a>" + "</h3>" +
            "<a href='https://www.twitch.tv/" + channelName + "' class='pull-right sStatus'>" +
            channelStatus + " </a>" + "</div>" + "<div class='col-xs-12 streamerInfo " +
            color + "'>" + "<p class='pull-left'>" + "<strong>Channel Info: </strong>" +
            status + "</p>" + "</div>");

        }
      },
    });
  }
}
