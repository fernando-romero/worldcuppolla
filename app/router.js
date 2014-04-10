App.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'matches',
    'matches': 'matches',
    'players': 'players'
  },

  initialize: function(){
    this.headerView = new App.Views.Header({ el: 'div#header' });
    this.firebaseViews = [];

    this.matchesView = new App.Views.Firebase({
      el: 'div#content',
      template: JST['app/templates/match.html'],
      isCollection: true,
      url: 'https://worldcuppolla.firebaseio.com/matches'
    });
    this.firebaseViews.push(this.matchesView);

    this.playersView = new App.Views.Firebase({
      el: 'div#content',
      template: JST['app/templates/player.html'],
      isCollection: true,
      url: 'https://worldcuppolla.firebaseio.com/players'
    });
    this.firebaseViews.push(this.playersView);
  },

  matches: function(){
    _.each(this.firebaseViews, function(firebaseView){
      firebaseView.autoRender = false;
    });
    this.matchesView.autoRender = true;
    this.matchesView.render();
  },

  players: function(){
    _.each(this.firebaseViews, function(firebaseView){
      firebaseView.autoRender = false;
    });
    this.playersView.autoRender = true;
    this.playersView.render();
  }
});

new App.Routers.Main();
Backbone.history.start();