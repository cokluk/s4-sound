
onNet("s4-sound:addQueue", (soundData, range, timeout) => { 
    addQueue(soundData, range, timeout); 
})

onNet("s4-sound:staticPlay", (soundData, timeout) => { 
    staticPlay(soundData, range, timeout); 
})


staticPlay = (soundData, timeout) => {
	SendNUIMessage({type: "static", soundData: soundData, timeout:timeout });   
}


addQueue = (soundData, range, timeout) => {
   if(range) {
	 emitNet("s4-sound:server:addQueue", soundData, range, timeout);  
   }else {
	 SendNUIMessage({type: "Queue", soundData: soundData, timeout:timeout });   
   }
}
 
RegisterNuiCallbackType("addNewTask");
on("__cfx_nui:addNewTask", (data, cb) => {
    emitNet("s4-sound:server:addNewTask", data)
})

onNet("s4-sound:playQueue", (soundData, timeout, player) => {	
   SendNUIMessage({type: "Queue", soundData: soundData, timeout:timeout, player: player });   
})

onNet("s4-sound:updateNearPlayer", (uniqueID, dist) => {	
   SendNUIMessage({type: "update", uniqueID: uniqueID, dist:dist });   
})

RegisterCommand('s4sound', async (source, args) => {
    
	  SendNUIMessage({type: "Queue", soundData: "https://raw.githubusercontent.com/0resmon/db/main/sound/bunualgerigonder.mp3", timeout: 5000, player: 1 });   

 
 }, false, );

 

//emitNet("s4-sound:server:addQueue", "https://raw.githubusercontent.com/0resmon/db/main/sound/bunualgerigonder.mp3", 15, 3000);  
//addQueue("https://raw.githubusercontent.com/0resmon/db/main/sound/bunualgerigonder.mp3", 15);

//https://raw.githubusercontent.com/0resmon/db/main/sound/bunualgerigonder.mp3