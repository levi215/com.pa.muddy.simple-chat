var elem = '<span style="line-height:20px;margin:0;width:3px;height:11px;margin-bottom:-1px;display:inline-block" data-bind="visible: (isGlobal() || isServer() || isTeam()), style: {backgroundColor: $root.getMessageFlairColor($data)}"></span>'

// Player Name for Normal Chat Message
//$('chat_message').child().prepend(elem)
$('span.chat_message_player_name').parent().prepend(elem);
$('.server_message span.chat_message_body').parent().prepend(elem);

// Player Name for Team Chat Message
$('span.team_chat_message_player_name').parent().prepend(elem);
//$('span.team_chat_message_player_name').setAttribute('color', getMessageFlairColor($data));

// Modifier for Team Chat Messages
//$('span.team_chat_message_player_name').style.color = getMessageFlairColor($data);

model.removeOldChatMessages = function () {
    var date = new Date();
    var cutoff = date.getTime() - 30 * 1000;

    while (model.visibleChat().length > 0 && model.visibleChat()[0].time_stamp < cutoff)
        model.visibleChat.shift();
};

model.getMessageFlairColor = function(data) {
	var color_map = model.color_map();

	if (data.isServer()) {
    console.log("Is Server")
		var message = data.message;

		for (var i = message.length; i >= 0; i--) {
			var _name = message.substring(0, i);
			if (_name in color_map) {
				return color_map[_name].color;
			}
		}
	}
	if (data.isGlobal()) {
    console.log("Is Global")
		if (data.player_name in color_map) {
      console.log("player found")
			return color_map[data.player_name].color;
		}
	}
  if (data.isTeam()) {
    if(data.player_name in color_map) {
      return color_map[data.player_name].color;
    }
  }
	return '';
}

model.color_map = ko.observable({});
handlers.update_player_color_index = function(payload) {
	model.color_map(payload);
};
