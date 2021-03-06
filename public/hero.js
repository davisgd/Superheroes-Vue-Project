var title = 'superheroes';

var app = new Vue({

  el: '#app',
  data: {

    title: title,
    heroes: undefined,
    postTitle: "Create a Superhero",
    name: undefined,
    superpower: undefined,
    img: undefined

  },

  created: function(){
    this.fetchData()
  },

  methods: {
    fetchData: function(){
      var self = this;
      $.ajax({
        method: "GET",
        url: "/api/heroes"
      }).done(function(response){
        console.log(response);
        self.heroes = response.data;
        console.log("Received heroes", self.heroes);
      });
    },
    postHero: function(){
      var self = this;
      var newSuperhero = {
        name: this.name,
        superpower: this.superpower,
        img: this.img
      };
      console.log(newSuperhero);
      $.ajax({
        url: '/api/heroes',
        method: 'POST',
        data: newSuperhero
      }).done(function(response){
        console.log(response.data, "Hero created!");
      })
    },
    deleteHero: function(_id){
      var self = this;
      $.ajax({
        url: '/api/heroes/' + _id,
        method: 'DELETE',
      }).done(function(response){
        console.log(response, "Hero deleted.");
      })
    }
  }
});
