S4 = {};
S4.SOUND = {};

window.addEventListener('message', function(event) {
   var data = event.data;	
   switch(event.data.type) {
     case "Queue":
	   S4.SOUND.Queue(data.soundData, data.timeout, data.player);
       break;
	 case "static":
	   S4.SOUND.Single(data.soundData, data.timeout);
       break;
	 case "update":
	   S4.SOUND.Update(data.uniqueID, data.dist);
       break;
   }
});

S4.SOUND.Queue = (soundData, timeout, player) =>  {
   var uniqueID = "Queue_"+Math.floor(Math.random() * 100 * 10000);
   $.post('https://s4-sound/addNewTask', JSON.stringify({ "uniqueID":  uniqueID , "player":  player }));
   var getQueueData = `<audio id="${uniqueID}" controls autoplay><source src="${soundData}" type="audio/mpeg"><script>var audio${uniqueID} = document.getElementById('${uniqueID}').play();   </script></audio>`;
   $("QueuedPlayer").append(getQueueData); 
   if(timeout != 0) { setTimeout(function(){ $(`#${uniqueID}`).remove(); }, timeout); }
}

S4.SOUND.Update = (uniqueID, dist) =>  {
  var audio = document.getElementById(uniqueID);
  var vol = 1.0;
  if(dist <= 2) {
	  vol = 1.0;
  }else if (dist <= 5) {
	  vol = 0.9;
  }else if (dist <= 10) {
	  vol = 0.7;
  }else if (dist <= 15) {
	  vol = 0.6;
  }else if (dist <= 20) {
	  vol = 0.4;
  }else if (dist <= 25) {
	  vol = 0.3;
  }else if (dist <= 30) {
	  vol = 0.2;
  }else if (dist <= 35) {
	  vol = 0.1;
  }else {
	  vol = 0.0;
  }
  if(audio) {
  audio.volume = vol; 
  }
}

S4.SOUND.Single = (soundData, timeout) =>  {
   $("SinglePlayer").html(`<audio id="static_player" ><source id="static_player_src" src="${soundData}" type="audio/mpeg"><script>var audio = document.getElementById('static_player').play();</script></audio></audio>`);
   if(timeout != 0) { setTimeout(function(){ $("SinglePlayer").html("");   }, timeout); }
}