<template>
	<div id="CommentItem">
		<router-link :to="'/user/'+info.author.loginname">
      <div class="commentInfo">
		<div class="comment-l">
		<div class="comment-logo">		
		<img  :src="info.author.avatar_url" width="60px"/>  
		</div>
		</div>
		<div class="comment-r">
		 <p>{{info.author.loginname}}</p>
		 <p class="comment-time">楼主&nbsp;▶&nbsp;发表于 <span>{{info.create_at | formatDate}}</span></p>
		 <p v-html="info.content"></p>
		  <div class="comment-good" @click="toggleChange()">
           <i class="fa fa-heart-o" v-if="toogleFlag" aria-hidden="true" ></i>
           <i class="fa fa-heart colorChange"   v-else  aria-hidden="true" ></i>
            </div>
		</div>
	</div>
	</router-link>
	</div>
</template>

<script>
	export default {
		name:'',
		props:['info'],
		created(){
       
		},
		data(){
			return {
              toogleFlag:true
			}
		},
		methods: {
			toggleChange(){
				this.toogleFlag = !this.toogleFlag
			}
		},
		watch:{			
			}
	}
</script>

<style lang="less" scoped="scoped">
    .colorChange{
    	color: coral !important;
    }
	#CommentItem {
		a{
			text-decoration: none;
			color: #333333;
		}
	 .commentInfo{
      	 width: 100%;      	
      	 border-bottom: 1px solid #eee;
      	 padding-right: 0.312rem;
      	.comment-l{
      		position: relative;
      	      .comment-logo {
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
		.comment-r{
			margin-left: 2.187rem;
			text-align: left;
			padding-top: 0.156rem;
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
			.comment-good{
				font-size: 0.375rem;
				position: absolute;
				right: 0.312rem;
				top:0.156rem;
			}
			.comment-time{
				font-size: 0.312rem;
				color: dimgray;
			}
		}
      }
	}
</style>