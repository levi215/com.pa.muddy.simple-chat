model.player_color_index = ko.computed(function() {
	var primary_map = {};

	var players = model.players();
	for (var p in players) {
		for (var s in (players[p].slots)) {
			var c = players[p].primary_color.map(function(val) {
				return Math.min(255, val);
			})
			primary_map[players[p].slots[s]] = {
				color: 'rgb(' + c.join(',') + ')',
				backgroundColor: 'rgba(255,255,255,0.0)'
			};
		}
	}
	api.panels.chat && api.panels.chat.message('update_player_color_index', primary_map);
	return primary_map;
});