model.removeOldChatMessages = function () {
    var date = new Date();
    var cutoff = date.getTime() - 30 * 1000;

    while (model.visibleChat().length > 0 && model.visibleChat()[0].time_stamp < cutoff)
        model.visibleChat.shift();
};
