import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '@/components/main/main'
import Article from '@/components/main/articleContent'
import User from '@/components/main/userInfo'
import About from '@/components/about/about'
import Create from '@/components/create/create'
import Login from '@/components/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
    	path:'/main',
    	redirect:{name:'main'}
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
     {
      path: '/Create',
      name: 'Create',
      component: Create
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Article/:articleId',
      name: 'Article',
      component: Article
    },
      {
      path: '/User/:userName',
      name: 'User',
      component: User
    }
  ]
})
