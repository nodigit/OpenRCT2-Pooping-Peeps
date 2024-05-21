var currentMonth = date.month;
var incidents = 0;

var checkPoopLevel = function() {
	if (date.ticksElapsed % 40 === 0){
	
		var allGuests = map.getAllEntities("guest");
		
		for (var i = 0; i < allGuests.length; i++) {
			var entity = allGuests[i];
			
			if (entity.toilet < 255){ entity.toilet++;}
			//if (entity.getFlag("toilet") == false) {entity.setFlag("toilet", true);}

			if (entity.toilet == 255){

				//Peep will randomy defecate once they reach their limit
				if (Math.random()*100 < 1){
					var entityPos = {x: entity.x, y: entity.y};
					var guestsHere = map.getAllEntitiesOnTile("guest", entityPos);
					var newLitter = map.createEntity("litter", guestsHere[0]);
					newLitter.litterType = "burger_box";
					entity.toilet = 0;
					entity.happiness = 0;
					incidents++;
				}
				
			}
				
		}
	}
}

var poopReport = function() {
	if (date.month !== currentMonth){

		//Alerts you if there's too many guests defecating
		if (incidents >= (park.guests*0.5)+1){
			var msg = {type: "guests", text: incidents+" pooping incidents occurred in your park last month. Considering adding more toilets to your park."};
			park.postMessage(msg);
		}
		
		incidents = 0;
		currentMonth = date.month;
	}
}


var main = function() {
	
	context.subscribe("interval.day", poopReport);
	
	context.subscribe(
		"interval.tick",
		function() {
			checkPoopLevel();
		}
	);
	
};

registerPlugin({
	name: "Pooping Peeps",
	version: "1.1",
	authors: ["nodigit"],
	type: "local",
	licence: "MIT",
	main: main
});
