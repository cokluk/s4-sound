let ESX = null;
emit("esx:getSharedObject", (obj) => ESX = obj);
 
TaskNearData = [];

onNet("s4-sound:server:addNewTask", (data) => {
   TaskNearData.push({ "uniqueID": data.uniqueID,"owner": data.player,  players: [] });
   TaskNearData.forEach(i => {  
     if(i.uniqueID == data.uniqueID) {
		i.players.push(source);
	 }
   });
})

onNet("s4-sound:server:addQueue", (x, y, z) => {
	GetClosestPlayers(source, x, y, z);
})

GetClosestPlayers = (player, x, range, timeout) => {
    var [p1x, p1y, p1z] = GetEntityCoords(GetPlayerPed(player));
	var Players = [];
	for (const v of ESX.GetPlayers()) {
		var [p2x, p2y, p2z] = GetEntityCoords(GetPlayerPed(v));
		var dist = GetDistanceBetweenCoords({x: p1x, y: p1y,z: p1z},{x: p2x, y: p2y, z: p2z});
		if(dist <= range) { Players.push({"src": v}); }
    }
	Players.forEach(i => { emitNet("s4-sound:playQueue", i.src, x, timeout, player); });
}
 
setInterval(function(){   
   TaskNearData.forEach(x => {  
      var [p1x, p1y, p1z] = GetEntityCoords(GetPlayerPed(x.owner));
      x.players.forEach(y => {  
	      var [p2x, p2y, p2z] = GetEntityCoords(GetPlayerPed(y));
	      var dist = GetDistanceBetweenCoords({x: p1x, y: p1y,z: p1z},{x: p2x, y: p2y, z: p2z});
		  emitNet("s4-sound:updateNearPlayer", y, x.uniqueID, dist);
	  });
   });
}, 1000);


GetDistanceBetweenCoords = (p1, p2) => {
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    var c = p2.z - p1.z;
    return Math.sqrt(a * a + b * b + c * c);
}