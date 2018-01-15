<template>
	<div id="login">
		<input type="text" placeholder="Access Token" v-model="Token"/>
		 <div class="loginout-btn" v-if="ToggleBtn">
         <v-btn  color="blue  lighten-1" dark @click="loginout()">退出</v-btn>
       </div>
		<div  class="login-btn" v-else >
         <v-btn  color="blue  lighten-1" dark @click="loginIn(Token)">登陆</v-btn>
      </div>
	</div>
</template>

<script>
   import {mapMutations} from 'vuex'
   export default {
   	name:'',
   	data(){
   		return {
   			Token:'',
   			
   		}
   	},
   	created(){
   		this.Token = window.localStorage.getItem('AccessToken') || ''
   	},
   	methods:{
   		loginout(){
   		this.loginOut()
   		this.Token = ''
   		window.localStorage.setItem('AccessToken','')  
   		this.$router.push({path:'/main'})
   		},
   		loginIn(Token){
   			Token = this.Token
   			let url = 'https://cnodejs.org/api/v1/accesstoken'
   			if(Token){
   			this.$http.post(url,{accesstoken:Token}).then(res=>{
   				//console.log(res.data)
   			    window.localStorage.setItem('AccessToken',Token)
   			    this.loginSuccess()
   			     alert('登陆成功！')
   		        this.$router.push({path:'/create'})
   			}).catch(error=>{
                window.localStorage.setItem('AccessToken','')		
                alert('AccessToken不存在！')
   			})
   			}else{
   				 alert('AccessToken不能为空！')
   			}
// 		   https://cnodejs.org/api/v1/accesstoken?accesstoken=da5c2fca-a981-4e13-89ae-9cd167edea2e
   		},
   		...mapMutations(['loginSuccess','loginOut'])
   	},
   	computed:{
   		ToggleBtn : function(){
   			return  window.localStorage.getItem('AccessToken').length > 0 ? true :false
   		}
   	}
   }
</script>

<style lang="less" scoped="scoped">
	#login{
		width: 100%;
		height: 100%;
		margin-top: 56px;
		padding: 0 0.312rem;
		  input{
			margin-top: 1.562rem;
			font-size: 0.437rem;
			outline: none;
			border: 1px solid #ccc;
			border-radius: 0.156rem;
			text-indent: 1em;
			width:100%;
			height: 0.937rem;
		}
		.login-btn{
			margin-top: 0.625rem;
			color: #fff;
			 button{
				width: 50%;
			}
		}
		.loginout-btn{
	     	margin-top: 0.625rem;
			color: #fff;
			 button{
			 	width:50%;
			 }
		}
	}
</style>