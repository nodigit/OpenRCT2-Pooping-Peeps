
var checkPoopLevel = function() {
	
	var allGuests = map.getAllEntities("guest");
	
	for (var i = 0; i < allGuests.length; i++) {
		var entity = allGuests[i];
		
	if (entity.toilet < 255){ entity.toilet = entity.toilet+1;}
			

		if (entity.toilet == 255){

			//Peep will randomy defecate once they reach their limit
			if (Math.random()*200 < 1){
				var entityPos = {x: entity.x, y: entity.y};
				var guestsHere = map.getAllEntitiesOnTile("guest", entityPos);
				var newLitter = map.createEntity("litter", guestsHere[0]);
				newLitter.litterType = "burger_box";
				entity.toilet = 0;
				entity.happiness = 0;
			}
			
		}
			
	}

}


var main = function()
{
	context.setInterval(function() {checkPoopLevel();}, 500);
}

registerPlugin({
	name: "Pooping Peeps",
	version: "1.0",
	authors: ["nodigit"],
	type: "local",
	licence: "MIT",
	minApiVersion: 29,
	main: main
});