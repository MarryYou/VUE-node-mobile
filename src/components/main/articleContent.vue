<template>
	<div id="article">
	<div v-show="!showFlag" class="content-loading">
		<img src="http://i04.pic.sogou.com/6dcce584085ed809"/>
	</div>
    <div v-if="loadingFlag" v-show="showFlag">
      <div class="authorInfo">
		<div class="author-l">
		<div class="author-logo">
	    <router-link :to="'/user/'+name" :username="name">
		<img v-show="loadingFlag" :src="imgSrc" width="60px"/> 
		</router-link>
		</div>
		</div>
		<div class="author-r">
		 <p>{{name}}</p>
		 <p><a href="#">#分享#</a></p>
		 <p>楼主发表于 <span>{{articleContent.create_at | formatDate}}</span></p>
		  <div class="author-like">
              <v-btn color="light-green lighten-1" small >收藏</v-btn>
            </div>
		</div>
	</div>
	    <h6><img v-show="articleContent.top" src="../../assets/top.gif"/>&nbsp;&nbsp;{{articleContent.title}}</h6>
	    <div class="article-content" ref='content' v-html="articleContent.content"></div>
	    <div class="line"></div>
	    <div class="comment">
	      <h6>评论</h6>
	    <Comment-View v-if="" :commentInfo="articleContent.replies"></Comment-View>
	    </div>
    </div>
    <div v-else class="loading-fail">
           <img src="http://i04.pic.sogou.com/d50c66e1e9df5351"/>
    </div>
	</div>
</template>

<script>
	import comment from '../common/Comment.vue'
	export default {
		name:'',
		components:{
			'Comment-View':comment
		},
		created(){
			this.articleId = this.$route.params.articleId
			this.getArticleInfo()
		},
		data() {
			return {
			  showFlag:false,
              articleId :'',
              articleContent:[],
              imgSrc:'',
              name:'',
              loadingFlag:true,
              commentFlag:false
			}
		},
		methods: {
		 htmlDecodeByRegExp (str){  
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&amp;/g,"&");
             s = s.replace(/&lt;/g,"<");
             s = s.replace(/&gt;/g,">");
             s = s.replace(/&nbsp;/g," ");
             s = s.replace(/&#39;/g,"\'");
             s = s.replace(/&quot;/g,"\"");
             return s;  
      },
			getArticleInfo(){
				let url = 'https://cnodejs.org/api/v1/topic/'+this.articleId
				let _self = this
				this.$http.get(url).then(res=>{
					if(!res){
					this.loadingFlag = false
					}else{
					this.articleContent = res.data.data
			    	//this.articleContent.content = this.articleContent.content.replace('<div class="markdown-text"><p>&lt;p&gt;','<div class="markdown-text"><p>')
			    	//this.articleContent.content = this.articleContent.content.replace('&lt;/p&gt;</p>\n</div>','</p>\n</div>')
					console.log(this.articleContent)
					if(	this.articleContent.replies){
						this.commentFlag = true
					}
					this.loadingFlag = true
					setTimeout(()=>{
						_self.showFlag = true
					},1500)				
					this.imgSrc = this.articleContent.author.avatar_url
					this.name = this.articleContent.author.loginname
					this.articleContent.content = this.htmlDecodeByRegExp(this.articleContent.content)
					this.$refs.content.innerHTML = this.articleContent.content
					console.log(this.articleContent)
					}
				})
			}
		},
		watch:{
			
			}
		}
	
</script>

<style lang="less" scoped="scoped">
	#article{
      padding-top:56px;  
      margin-bottom: 56px;  
      .content-loading{
      	padding-top: 3.125rem;
      }  
      .authorInfo{
      	 wwidth: 100%;
      	 height:2.343rem;
      	 border-bottom: 1px solid #eee;
      	.author-l{
      		position: relative;
      	     .author-logo {
					width: 1.5rem;
					height: 1.5rem;
					position: absolute;
					border: 1px solid #fff;
					overflow: hidden;
					left: 0.468rem;
					top: 0.312rem;
					border-radius: 50%;
					img {
						width: 100%;
						height: 100%
					}
				}
		}
		.author-r{
			margin-left: 2.187rem;
			text-align: left;
			padding-top: 0.312rem;
			position: relative;
			p{  
				margin: 0;
				line-height: 0.562rem;
				font-size:0.312rem;
			}
			a{
				text-align: left;
				text-decoration: none;
				color: #42B983;
			}
			.author-like{
				color:  aliceblue;
				position: absolute;
				right: 0.312rem;
				top: 0.562rem;
				.btn {
					min-width: 1.562rem;
				}
			}
		}
      }
      .loading-fail{
      	padding-top: 3.125rem;
      }
      h6{
      	margin: 0.156rem 0;
      	padding: 0 0.312rem;
      	text-align: left;
      	font-size: 0.406rem;
      }
      .article-content{
      	width: 100%;
      	overflow: hidden;
      	font-size:0.437rem;
      	padding: 0 0.312rem;
      	text-align: left;
      	line-height: 0.625rem
      }
      .comment{
         h6{
          	font-size: 0.437rem;
          	line-height: 0.625rem;
          	padding-bottom: 0.156rem;
          	border-bottom: 2px solid #eee;
          }
      }
      .line{
      	width: 100%;
      	height: 0.312rem;
      	background: #eee;
      }
	}
</style>