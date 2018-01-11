<template>
	<div id="user">
    <div class="userInfo">
     <div class="userInfo-t">
       <div class="logo-info">
       	<img :src="imgSrc" width="64px"/>
       </div>
       <p>{{name}}</p>
     </div>
     <div class="userInfo-b">
     <span>注册时间：{{createTime | fromNow}}</span><span class="user-count">积分：{{count}}</span>
     </div>
    </div>
    <div class="tab" ref="tab">
    	<div class="tab-item-l TabColor" @click="toggleColor()">回复</div>
    	<div class="tab-item-r" @click="toggleColor()">主题</div>
    </div>
    <div v-if="ListShowFlag">
     <router-link v-for="item in recent_replies" :to="'/article/'+item.id">
     <div class="production-content">
    
    	<div class="production-content-l">
    		<div class="production-logo">
    			<img :src="item.author.avatar_url" width="40px"/>
    		</div>
    	</div>
    	<div class="production-content-r">
    		<div><span class="production-username">{{item.author.loginname}}</span><span class="production-readTime">{{item.last_reply_at |formatDate}}</span></div>
    		<div class="production-title">{{item.title}}</div>
    	</div>
     </div>
   </router-link>
    </div>
    <div v-else>
    <router-link v-for="item in recent_topics"  :to="'/article/'+item.id">
     <div class="production-content">
    	<div class="production-content-l">
    		<div class="production-logo">
    			<img :src="item.author.avatar_url" width="40px"/>
    		</div>
    	</div>
    	<div class="production-content-r">
    		<div><span class="production-username">{{item.author.loginname}}</span><span class="production-readTime">{{item.last_reply_at |formatDate}}</span></div>
    		<div class="production-title">{{item.title}}</div>
    	</div>
     </div>
      </router-link>
    </div>
	</div>
</template>
<script>
	export default {
		name:'',
		created(){
           this.username = this.$route.params.userName
           this.getUserInfo()
		},
		data() {
			return {
              username:'',
              name:'',
              imgSrc:'',
              createTime:'',
              count:'',
              ListShowFlag:'true',
              recent_replies:[],
              recent_topics:[]
			}
		},
		methods: {
			getUserInfo(){
				let url = 'https://cnodejs.org/api/v1/user/'+this.username
				this.$http.get(url).then(res=>{
					let info = res.data.data
                    this.name = info.loginname
                    this.imgSrc = info.avatar_url
                    this.createTime = info.create_at
                    this.count = info.score
                    this.recent_replies = info.recent_replies                   
                    this.recent_topics = info.recent_topics
                    this.recent_replies.forEach(function(item){
                    	if(item.title.length > 21){
                    	   item.title = item.title.substr(0,21)+'...'
                    	}
                    })
                    this.recent_topics.forEach(function(item){
                    	if(item.title.length > 21){
                    	   item.title = item.title.substr(0,21)+'...'
                    	}
                    })
                     console.log(res)
				})
			},
			toggleColor(){
			let dom  = event.target
			let tabs = this.$refs.tab.children
			if(! dom.classList.contains('TabColor')){
				this.ListShowFlag = !this.ListShowFlag
                for (let i = 0;i<tabs.length;i++) {
                	 let item = tabs[i]
                  if(item.classList.contains('TabColor')){
						item.classList.remove('TabColor')
					}else{
						item.classList.add('TabColor')
					}
                }
			}
			}
		},
		watch:{	
			
			}
	}
</script>

<style lang="less" scoped="scoped">
	#user {
		a{
			text-decoration: none;
			color: #333;
		}
		margin-top: 56px;
		 .userInfo{
			width: 100%;
			height:4.062rem;
			background:#8bc34a;
			color: #fff;
			.userInfo-t{
				height: 3.125rem;
				position: relative;
			 .logo-info{
				width:2rem;
				height: 2rem;
				overflow: hidden;
				border-radius: 50%;
				position: absolute;
			    background: #fff;
				left: 50%;
				top:0.468rem;
			    transform: translateX(-50%);
			}
			p{  
				margin: 0;
				font-size: 0.375rem;
				font-weight: 700;
				position: absolute;
				bottom: 0.093rem;
				left: 50%;
				transform: translateX(-50%);
			}
			}
			.userInfo-b{
				width: 100%;
				height: 0.937rem;
				font-size: 0.375rem;
				font-weight: 700;
			}
			span{
				line-height: 0.937rem;
				float: left;
				margin: 0 0.312rem;
			}
			.user-count{
				float: right;
			}
		}
		.tab{
			width: 100%;
			color: #333333;
			height:1.25rem;
			border-bottom: 1px solid #EEEEEE;
			font-size: 0.375rem;
			div{
				display: inline-block;
				float: left;
				line-height: 1.25rem;
				width: 50%;
				height: 100%;
				text-align: center;
			}
			.tab-item-l{
				border-right: 1px solid #eee;
			}
			.TabColor{
				color: limegreen;
			}
		}
		.production-content{
			width: 100%;
			height: 1.875rem;
			display: flex;
			border-bottom: 1px solid #eee;
		 .production-content-l{
			flex: 2;
			.production-logo{
				background: #fff;
				width:1.25rem;
				height: 1.25rem;
				margin: 0.312rem auto;
				overflow: hidden;
				border-radius: 50%;
			}
		}
		.production-content-r{
			flex: 8;
			padding-top: 0.312rem;
			font-size: 0.375rem;
			text-align: left;
			line-height:0.625rem;
			 div{
				display: block;
				width: 100%;
				position: relative;
				overflow: hidden;
				height: 0.625rem;
				.production-username{
					position: absolute;
					left: 0;
					top: 0;
				}
				.production-readTime{
			    	position: absolute;
					right: 0.468rem;
					top: 0;	
				}
				.production-title{
		          display: -webkit-box;
                  overflow: hidden;
                  text-overflow: ellipsis;
                 -webkit-box-orient: vertical;
				}
			}
		}
		}

	}
</style>