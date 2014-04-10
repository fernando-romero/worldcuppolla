App.Views.Firebase = Backbone.View.extend({
  initialize: function(options){
    this.template = options.template;
    this.isCollection = options.isCollection;
    this.reference = new Firebase(options.url);
    this.reference.on('value', this._onValue, this._onError, this);
    this.autoRender = this.autoRender || true;
  },

  setUrl: function(url){
    this.reference = new Firebase(url);
    this.reference.on('value', this._onValue, this._onError, this);
  },

  _onError: function(err){
    console.log(err);
  },

  _onValue: function(dataSnapshot){
    this.dataSnapshot = dataSnapshot;
    if (this.autoRender) this.render();
  },

  render: function(){
    var self = this;
    this.$el.empty();
    if (this.dataSnapshot){
      this.isCollection ? this._renderCollection() : this._renderModel(); 
    }
    return this;
  },

  _renderCollection: function(){
    var self = this;
    this.dataSnapshot.forEach(function(childSnapshot){
      self.$el.append(self.template({ 
        name: childSnapshot.name(),
        val: childSnapshot.val()
      }));
    });
  },

  _renderModel: function(){
    this.$el.html(this.template({
      name: this.dataSnapshot.name(),
      val: this.dataSnapshot.val()
    }));
  }
});