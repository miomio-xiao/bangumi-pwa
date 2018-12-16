import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue')
    },
    {
      path: '/subject/:id',
      name: 'subject',
      component: () =>
        import(/* webpackChunkName: "Subjects" */ './views/Subjects.vue')
    },
    {
      path: '/comments/:id',
      name: 'comments',
      component: () =>
        import(/* webpackChunkName: "Comments" */ './views/Comments.vue')
    },
    {
      path: '/blogs/:id',
      name: 'blogs',
      component: () =>
        import(/* webpackChunkName: "Blogs" */ './views/Blogs.vue')
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: () =>
        import(/* webpackChunkName: "Blog" */ './views/Blog.vue')
    },
    {
      path: '/ep/:id',
      name: 'ep',
      component: () =>
        import(/* webpackChunkName: "EpInfo" */ './views/EpInfo.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import(/* webpackChunkName: "Search" */ './views/Search.vue')
    },
    {
      path: '/browser',
      name: 'browser',
      component: () =>
        import(/* webpackChunkName: "Browser" */ './views/Browser.vue')
    },
    {
      path: '/rank',
      name: 'rank',
      component: () =>
        import(/* webpackChunkName: "Rank" */ './views/Rank.vue')
    }
  ]
});
