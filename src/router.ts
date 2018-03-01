import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Subjects from './views/Subjects.vue';
import Search from './views/Search.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/subject/:id',
      name: 'subject',
      component: Subjects
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
});
