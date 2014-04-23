App.Views.Header = Backbone.View.extend({
  template: JST['app/templates/header.html'],

  events: {
    'click .logout': '_logout',
    'click .login': '_login'
  },

  initialize: function(){
    var self = this;
    this.auth = new FirebaseSimpleLogin(App.FirebaseRef, function(error, user){
      if (error) console.log(error);
      if (user){
        self.meRef = App.FirebaseRef.child('players/' + user.username);
        self.meRef.on('value', function(dataSnapshot){
          var me = dataSnapshot.val();
          if (me){
            App.me = dataSnapshot.val();
            App.me.username = dataSnapshot.name();
            self.render();
          } else {
            self.meRef.setWithPriority({
              name: user.name,
              profilePicture: 'https://graph.facebook.com/' + user.username + '/picture?width=200&height=200',
              points: 0,
              forecasts: App.forecastsSnapshot.val()
            }, 0);
          }
        });
      } else {
        delete App.me;
        self.render();
      }
    });
  },

  render: function(){
    this.$el.html(this.template({ me: App.me }));
    return this;
  },

  _logout: function(){
    this.auth.logout();
  },

  _login: function(){
    this.auth.login('facebook');
  }
});