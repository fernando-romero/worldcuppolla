App.Routers.Main = Backbone.Router.extend({

  routes: {
    '': 'players',
    'players': 'players',
    'players/:username': 'player'
  },

  initialize: function(){
    this.firebaseUrl = 'https://worldcuppolla.firebaseio.com';
    this.headerView = new App.Views.Header({ el: 'div#header' });
  },

  _loadFirebaseView: function(template, path){
    if (this.selectedView) this.selectedView.remove();
    $("div#header").after("<div id='content'></div>");
    this.selectedView = new App.Views.Firebase({
      el: 'div#content',
      template: JST[template],
      reference: App.FirebaseRef.child(path)
    });
  },

  players: function(){
    this._loadFirebaseView('app/templates/players.html', 'players');
  },

  player: function(username){
    this._loadFirebaseView('app/templates/player.html', 'players/' + username);
  }

});

App.FirebaseRef.child('forecasts').on('value', function(snapshot){
  App.forecastsSnapshot = snapshot;
  new App.Routers.Main();
  Backbone.history.start();
});

App.FirebaseRef.child('teams').on('teams', function(snapshot){
  App.teamsSnapshot = snapshot;
});
