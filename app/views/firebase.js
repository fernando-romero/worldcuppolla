App.Views.Firebase = Backbone.View.extend({
  initialize: function(options){
    this.template = options.template;
    options.reference.on('value', this._onValue, this._onError, this);
  },

  _onError: function(err){
    console.log(err);
  },

  _onValue: function(dataSnapshot){
    this.dataSnapshot = dataSnapshot;
    this.render();
  },

  render: function(){
    var self = this;
    if (this.dataSnapshot)
      this.$el.html(self.template({ data: this.dataSnapshot }));
    return this;
  }
});