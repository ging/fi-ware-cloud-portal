var MessagesView = Backbone.View.extend({

    _template: _.template($('#messagesTemplate').html()),

    cid: undefined,

    initialize: function() {

        this.el = this.options.el || "#log-messages";
        this.cid = Math.round(Math.random() * 1000000);
        this.options.state = this.options.state || "Success";
        var events = {};
        this.delegateEvents(events);
    },

    safe_tags_replace: function (str) {
        var tagsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        };
        return str.replace(/[&<>]/g, function(tag) {
            return tagsToReplace[tag] || tag;
        });
    },

    showInfo: function(evt) {
        var self = this;
        evt.preventDefault();
        evt.stopPropagation();
        var subview = new ConfirmView({el: 'body', title: this.options.title, message: this.safe_tags_replace(this.options.info), btn_message: "Ok"});
        subview.render();
    },

    close: function() {
        $('.messages').remove();
        this.undelegateEvents();
    },

    render: function () {
        var self = this;
        $(this.el).append(this._template({title:this.options.title, state:this.options.state, info:this.options.info, cid: this.cid}));
        console.log("Rendering, ", ($('.messages').length-1)*(48)+'px');
        $(this.el).animate({scrollTop: ($('.messages').length-1)*(48)+'px'}, 500);
        /*$('.messages').fadeOut(4000, function() {
            self.close();
        });*/
        events['click #info_' + this.cid] = 'showInfo';
        return this;
    }

});