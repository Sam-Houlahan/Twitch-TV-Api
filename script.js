
let users = ["ESL_SC2", "OgamingSC2", "TimTheTatman", "freecodecamp", ];

const streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
const channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";

loadApi();
function loadApi (){

  for (var i=0; i < users.length; i++) {

  $.ajax({
     url: streamUrl + users[i],
     dataType: "jsonp",
     type: "GET",
     headers: {
       "Api-User-Agent": "Example/1.0"
     },

     success: function(data) {

let title = data.stream.channel.display_name;
let viewers = data.stream.viewers;
let logo = data.stream.channel.logo;
let game = data.stream.channel.game;
console.log(game);


if (data.stream === null){
  $("#status").html("Currently Offline")
  
} else {
  $("#status").html("Currently Online")
}



  $('#name').append('<h4>' + title + '</h4><br/>'  );
  $('#viewers').append('<h4>' + viewers + '</h4><br/>'  );
  $('#logo').append('<img width ="150px" height = "100px" src="' + logo + '"><br><br>' );

$("#channels").append('<div class ="col-md-4">'+ '<h4>' + title + '</h4><br/>' + '</div>')


}
 });
 $.ajax({
    url: channelUrl+ users[i],
    dataType: "jsonp",
    type: "GET",
    headers: {
      "Api-User-Agent": "Example/1.0"
    },

    success: function(data2) {
      console.log(data2);
},
});
}
}
