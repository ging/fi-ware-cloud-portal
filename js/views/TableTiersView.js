var TableTiersView = Backbone.View.extend({

    _template: _.itemplate($('#tableTiersTemplate').html()),

    cid: undefined,

    initialize: function() {
        // main_buttons: [{label:label, url: #url, action: action_name}]
        // dropdown_buttons: [{label:label, action: action_name}]
        // headers: [{name:name, tooltip: "tooltip", size:"15%", hidden_phone: true, hidden_tablet:false}]
        // entries: [{id:id, cells: [{value: value, link: link}] }]
        // onAction: function() {}
        this.cid = Math.round(Math.random() * 1000000);
        var events = {};
        events['click .btn-main-' + this.cid] = 'onMainAction';
        this.delegateEvents(events);
        this.options.disableContextMenu = true;
    },

    getEntries: function() {
        var self = this;
        return this.options.getEntries.call(this.options.context);
    },

    getHeaders: function() {
        return this.options.getHeaders.call(this.options.context);
    },

    getDropdownButtons: function() {
        return this.options.getDropdownButtons.call(this.options.context);
    },

    getMainButtons: function() {
        return this.options.getMainButtons.call(this.options.context);
    },

    onAction: function(action, entries) {
        entries.forEach(function(entry) {
            entry.id = entry.id;
        });
        return this.options.onAction.call(this.options.context, action, entries);
    },

    onClose: function() {
        this.undelegateEvents();
        this.unbind();
    },

    onMainAction: function(evt) {
        var btn_idx = $(evt.target)[0].id.split("_" + this.cid)[0];
        var btn = this.getMainButtons()[btn_idx];
        var entries = [];
        this.onAction(btn.action, entries);
    },

    render: function() {
        var entries = this.getEntries();
        var new_template = this._template({
            cid: this.cid,
            main_buttons: this.getMainButtons(),
            headers: this.getHeaders(),
            entries: entries,
            color: this.options.color,
            color2: this.options.color2,
            dropdown_buttons_class: this.options.dropdown_buttons_class
        });

        var scrollTo = $(".scrollable_" + this.cid).scrollTop();
        $(this.el).html(new_template);
        $(".scrollable_" + this.cid).scrollTop(scrollTo);
        $(".dial").knob();
        return this;
    }
});