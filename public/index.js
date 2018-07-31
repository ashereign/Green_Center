/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      posts: [],
      currentPost: {},
      titleFilter: ""
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
    },
    isValidPost: function(post) {
      return post.title.toLowerCase().includes(this.titleFilter.toLowerCase());
    }
  },
  computed: {
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      username: "",
      password: "",
      avatar: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        username: this.username,
        avatar: this.avatar,
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

var UserShowPage = {
  template: "#user-show-page",
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get("/users/" + this.$route.params.id).then(function(response){
      this.user = response.data;
      console.log(this.user);
    }.bind(this));
  },
  methods: {
    getUserId: function() {
      return localStorage.getItem("user_id");
    },
    isOwner: function() {
      if(localStorage.getItem("user_id")== this.user.id){
        console.log("success");
        return true 
      } else{
        console.log("failure")
        return false
      }
    }
  },
  computed: {}
};

var UserEditPage = {
  template: "#user-edit-page",
  data: function() {
    return {
      name: "",
      email: "",
      username: "",
      avatar: "",
      password: "",
      passwordConfirmation: "",
      id: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/users/" + this.$route.params.id).then(function(response){
      console.log(response.data)
      this.name = response.data.name;
      this.email = response.data.email;
      this.username = response.data.username;
      this.avatar = response.data.avatar;
      this.id = response.data.id;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        username: this.username,
        avatar: this.avatar,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios.patch("/users/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/users/" + this.$route.params.id);
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    deleteProfile: function() {
      axios.delete("/users/" + this.id).then(function(response){
        router.push("/");
      }.bind(this));
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
          localStorage.setItem("user_id", response.data.user.id);
          console.log(response.data)
          router.push("/users/" + response.data.user.id);
          // need to interpolate current user id into id
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
    localStorage.removeItem("user_id");
    router.push("/");
  }
};

var PostNewPage = {
  template: "#post-new-page",
  data: function() {
    return {
      title: "",
      body: "",
      mainPicture: "",
      link: "",
      topics: [],
      errors: [],
      topicIds: []
    };
  },
  created: function() {
    axios.get("/api/topics/").then(function(response){
      this.topics = response.data;
      console.log(this.topics);
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        body: this.body,
        main_picture: this.mainPicture,
        link: this.link,
        topic_ids: this.topicIds
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

var PostShowPage = {
  template: "#post-show-page",
  data: function() {
    return {
      post: {},
      topics: []
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(function(response){
      this.post = response.data;
      console.log(this.post);
    }.bind(this));
    {
        axios.get("/api/topics/").then(function(response){
          this.topics = response.data;
          console.log(this.topics);
        }.bind(this));
      }
  },

  methods: {
    isOwner: function() {
      console.log(localStorage.getItem("user_id"));
      console.log(this.post.user_id);
      if(localStorage.getItem("user_id")== this.post.user_id){
        console.log("success");
        return true 
      } else{
        console.log("failure")
        return false
      }
    }
  },
  computed: {}
};

var PostEditPage = {
  template: "#post-edit-page",
  data: function() {
    return {
      title: "",
      body: "",
      mainPicture: "",
      link: "",
      id: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(function(response){
      console.log(response.data)
      this.title = response.data.title;
      this.body = response.data.body;
      this.mainPicture = response.data.main_picture;
      this.link = response.data.link;
      this.id = response.data.id;
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
          router.push("/posts/" + this.$route.params.id);
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    deletePost: function() {
      axios.delete("/api/posts/" + this.id).then(function(response){
        router.push("/");
      }.bind(this));
    }
  }
};

var TopicShowPage = {
  template: "#topic-show-page",
  data: function() {
    return {
      topic: {},
      message: {},
      
    };
  },
  created: function() {
    axios.get("/api/topics/" + this.$route.params.id).then(function(response){
      this.topic = response.data;
      console.log(this.topic);
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/posts/new", component: PostNewPage },
  { path: "/posts/:id", component: PostShowPage},
  { path: "/posts/:id/edit", component: PostEditPage},
  { path: "/topics/:id", component: TopicShowPage},
  { path: "/users/:id", component: UserShowPage},
  { path: "/users/:id/edit", component: UserEditPage}
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
  },
  methods: {
      isLoggedIn: function() {
        if(localStorage.getItem("jwt")) {
          return true;
        }
        return false;
      },
      getUserId: function() {
        return localStorage.getItem("user_id");
      }
    }
});