/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      posts: [],
      currentPost: {}
    };
  },
  created: function() {
    axios.get("/api/posts").then(function(response) {
      this.posts = response.data;
      console.log(this.posts);
    }.bind(this));
  },
  methods: {
    setCurrentPost: function(post) {
      this.currentPost = post;
      console.log(this.currentPost);
    }
  },
  computed: {}
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var NewPostPage = {
  template: "#new-post-page",
  data: function() {
    return {
      title: "",
      body: "",
      mainPicture: "",
      link: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        body: this.body,
        mainPicture: this.mainPicture,
        link: this.link
      };
      axios
        .post("/api/posts", params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var ShowPostPage = {
  template: "#show-post-page",
  data: function() {
    return {
      post: {}
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(function(response){
      this.post = response.data;
      console.log(this.post);
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var EditPostPage = {
  template: "#edit-post-page",
  data: function() {
    return {
      title: "",
      body: "",
      mainPicture: "",
      link: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(function(response){
      this.title = response.data.title;
      this.body = response.data.body;
      this.mainPicture = response.data.main_picture;
      this.link = response.data.link;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        body: this.body,
        main_picture: this.mainPicture,
        link: this.link
      };
      axios.patch("/api/posts/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    deletePost: function(post) {
      axios.delete("/api/posts/" + post.id).then(function(response){
        var index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }.bind(this));
    }
  }
};

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/posts/new", component: NewPostPage },
  { path: "/posts/:id", component: ShowPostPage},
  { path: "/posts/:id/edit", component: EditPostPage},
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});



var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});