<template>
  <div id="app">
   <v-toolbar :color="bar.class" :dark="bar.dark" fixed >
   	<i v-if="isBackFlag" class="fa fa-reply-all backIcon" aria-hidden="true" @click="backHome()"></i>
    <img data-v-32d2a565="" src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" class="logo-img">
   </v-toolbar>
    <router-view/>
    <v-bottom-nav   
      shift
      :value="true"
      :active.sync="e2"
      :color="computedColor"
    >
      <v-btn dark @click="pathChange(0)"> 
        <span>首页</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn dark @click="pathChange(1)">
        <span>发布</span>
        <v-icon>create</v-icon>
      </v-btn>
      <v-btn dark @click="pathChange(2)">
        <span>关于</span>
        <v-icon>report</v-icon>
      </v-btn>
      <v-btn dark @click="pathChange(3)">
        <span>登陆</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
  },
  data(){
  	return {
  		e2:0,
  		bar:{ 'class': 'light-green lighten-1', dark: true },
  		isBackFlag:false,
  		pathUrl:{}
  	}
  },
  methods:{
  	pathChange(index){
  		switch (index){
  			case 0:
  			this.$router.push({path:'/main'})
  				break;
  			case 1:
  			this.$router.push({path:'/create'})
  				break;
  		  case 2:
  			this.$router.push({path:'/about'})
  				break;
  			case 3:
  			this.$router.push({path:'/login'})
  				break;
  		}
  	},
  	backHome(){
  		
  		this.$router.back()
  	}
  },
  computed:{
  	computedColor(){
  		switch (this.e2){
  			case 0:
  			 return 'light-green lighten-1'
  				break;
  			case 1:
  			 return 'teal lighten-1'
  				break;
  		  case 2:
  			 return 'lime  lighten-1'
  				break;
          case 3:
            return 'blue  lighten-1'
          break
  		}
  		
  	}
  },
  watch:{
  	$route(val,oldval){
      if(val.name == 'Article'||val.name == 'User'){
      	    this.isBackFlag = true
      }else{
      		 this.isBackFlag = false
      }
  	}
  }
}
</script>

<style lang="less">
	html,body{
		width: 100%;
		height: 100%;
	}
#app {
  display: block;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100% !important;
  height: 100% !important;
  color: #2c3e50;
  .tabs__wrapper{
			overflow-x: hidden !important;
		}
  .backIcon{
  	position: absolute;
    font-size:0.562rem;
  	left: 0.156rem;
  	top: 0.625rem;
  	color: #fff;
  }
  .logo-img{
  width:4.5rem;
  margin: 0 auto;
  }
  .markdown-text{
  	line-height: 0.625rem;
  	 ul,ol{
      		li{
      			list-style: none;
      		}
      	}
          p { 	  
          	font-size:0.375rem;
      	     img{  
      		  width: 100%;
      		  min-height: 4.687rem;
         	}
      	 }
        }
}
</style>
