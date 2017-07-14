var title = 'villains';

var app = new Vue ({

  el: '#app',
  data: {

    title: title,
    villains: undefined,
    postTitle: "Create a Villain",
    name: undefined,
    evilPower: undefined,
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
        url: "/api/villains"
      }).done(function(response){
        console.log(response);
        self.villains = response.data;
        console.log("Received villains", self.villans);
      })
    },
    postVillain: function(){
      var self = this;
      var newVillain = {
        name: this.name,
        evilPower: this.evilPower,
        img: this.img
      };
      console.log(newVillain);
      $.ajax({
        url: '/api/villains',
        method: "POST",
        data: newVillain
      }).done(function(response){
        console.log(response.data, "Villain created!");
      })
    },
    deleteVillain: function(_id){
      var self = this;
      $.ajax({
        url: '/api/villains/' + _id,
        method: "DELETE",
      }).done(function(response){
        console.log(response, "Villain deleted.");
      })
    }
  }
});
