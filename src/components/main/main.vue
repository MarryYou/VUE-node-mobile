<template>
	<div id="main">
		<v-tabs fixed centered>
			<div  class="wrapper">
			<v-tabs-bar class="light-green lighten-4" dark>
				<v-tabs-slider class="orange lighten-1"></v-tabs-slider>
				<v-tabs-item v-for="i in items" :key='i.id' :href="'#tab-' + i.id" @click="getTopicsInfo(i.tab)">
					{{ i.title }}
				</v-tabs-item>
			</v-tabs-bar>
			<v-tabs-items>
				<v-tabs-content v-for="i in items" :key="i.id" :id="'tab-' + i.id">
					<v-card flat>
						<div v-if="loadingFlag" class="item-loading">
							<v-progress-circular indeterminate color="light-green lighten-1"></v-progress-circular>
						</div>
						<router-link :to="'/article/'+info.id" v-else v-for="info in productInfo">
							<div class="Card-item">
								<div class="Card-item-t">
									<div class="item-logo">
										<img :src="info.author.avatar_url" />
									</div>
									<div class="item-content">
										<h6><span class="item-Uname">{{info.author.loginname}}</span><span class="item-createTime">{{info.create_at | formatDate}}</span></h6>
										<p class="item-Title"><img v-show="info.top" src="../../assets/top.gif" />&nbsp;{{info.title}}</p>
									</div>
								</div>
								<div class="Card-item-b">
									<span><i class="fa fa-commenting-o" aria-hidden="true"></i>{{info.reply_count}}</span>
									<span><i class="fa fa-eye" aria-hidden="true"></i>{{info.visit_count}}</span>
									<span class="item-Share"><i class="fa fa-tags" aria-hidden="true"></i>分享</span>

								</div>
							</div>
						</router-link>
					</v-card>
				</v-tabs-content>
				<div v-show="loadingMoreFlag" class="item-loadingMore">
					<v-progress-circular indeterminate color="light-green lighten-1"></v-progress-circular>
				</div>
			</v-tabs-items>
			</div>
		</v-tabs>
	</div>
	</div>
</template>

<script>
	export default {
		name:'HomePage',
        mounted(){
        	window.addEventListener('scroll',this.handleScroll)
        },
		created(){
			this.getTopicsInfo('all') 
		},
		data() {
			return {
				loadingFlag:false,
				loadingMoreFlag:false,
				tabTag:'all',
				pageIndex:1,
				items: [{
						title: '全部',
						tab: 'all',
						id: 0
					}, {
						title: '精华',
						tab: 'good',
						id: 1
					},
					{
						title: '分享',
						tab: 'share',
						id: 2
					}, {
						title: '问答',
						tab: 'ask',
						id: 3
					},
					{
						title: '测试',
						tab: 'dev',
						id: 4
					}
				],
				productInfo: []

			}
		},
		methods: {
			getTopicsInfo(tag) {
				this.loadingFlag = true			
				this.tabTag = tag
				let url = 'https://cnodejs.org/api/v1/topics?tab=' + tag + '&limit=20&page=1';
				this.$http.get(url).then(res => {
				let _self = this
					if(res){
                    setTimeout(function(){
                    	_self.loadingFlag = false;
                    },1500)
					}
					this.productInfo = res.data.data
					this.productInfo.forEach(function(item, index) {
						if(item.title.length > 40) {
							item.title = item.title.substr(0, 40) + '...'
						}
					})					
					//console.log(res)
				})
			},
			handleScroll(){
                 let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                 let innerHeight  = window.innerHeight - 56 * 2    
                 if(document.querySelector('.wrapper')){
                  let clientHeight  = document.querySelector('.wrapper').clientHeight 
                  if(scrollTop + innerHeight > clientHeight){
                     this.loadingMoreFlag = true;
                  }
                 }
                // console.log(scrollTop+'___'+innerHeight+"_____"+clientHeight)
			},
			loadMore(){
				this.loadingMoreFlag = true
				this.pageIndex++
				let _self = this
			//	console.log(this.tabTag)
				let url = 'https://cnodejs.org/api/v1/topics?tab=' + this.tabTag + '&limit=20&page='+this.pageIndex;
			    this.$http.get(url).then(res => {
					this.productInfo = this.productInfo.concat(res.data.data)
					this.productInfo.forEach(function(item, index) {
						if(item.title.length > 40) {
							item.title = item.title.substr(0, 40) + '...'
						}
					})	
					this.loadingMoreFlag = false
				})
			}
		},
		watch:{
			loadingMoreFlag:function(val,oldval){
			 if(val){
			 	this.loadMore()
			 }				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#main {
		flex: 1;
		margin-top: 56px;
		margin-bottom: 36px;
		background: #FFFFFF;
		.tabs__bar {
			font-size: 0.375rem !important;
		}
		.tabs__items {
			margin-bottom: 1.562rem;
		}
		a {
			text-decoration: none;
			color: #333;
		}
		.Card-item {
			width: 100%;
			height: 3.125rem;
			.Card-item-t {
				position: relative;
				width: 100%;
				height: 2.187rem;
				display: flex;
				overflow: hidden;
				border-bottom: 1px solid #eee;
				.item-logo {
					width: 1.5rem;
					height: 1.5rem;
					position: absolute;
					border: 1px solid #fff;
					overflow: hidden;
					left: 0.625rem;
					top: 0.312rem;
					border-radius: 50%;
					img {
						width: 100%;
						height: 100%
					}
				}
				.item-content {
					flex: 1;
					margin-left: 2.5rem;
					text-align: left;
					h6 {
						font-size: 0.375rem;
						margin-top: 0.156rem;
						height: 0.625rem;
						position: relative;
						font-weight: 400;
						line-height: 0.593rem;
						.item-Uname {
							display: inline-block;
							position: absolute;
							left: 0;
						}
						.item-createTime {
							display: inline-block;
							position: absolute;
							right: 0.468rem;
						}
					}
					.item-Title {
						width: 100%;
						height: 1.25rem;
						font-size: 0.375rem;
						padding-right: 0.062rem;
						overflow: hidden;
					}
				}
			}
			.Card-item-b {
				text-align: left;
				width: 100%;
				height: 0.937rem;
				border-bottom: 1px solid #42B983;
				span {
					font-size: 0.437rem;
					float: left;
					line-height: 0.937rem;
					margin-left: 0.937rem;
					i {
						margin-right: 0.25rem;
						color: orangered;
					}
				}
				.item-Share {
					float: right;
					margin-right: 0.468rem;
					i {
						color: #42B983;
					}
				}
			}
		}
		.item-loading {
			div{
				height: 40px !important;
				padding-top: 400px;
				width: 40px !important;
			}
		}
	 .item-loadingMore {
			 	 padding-top: 0.312rem;
			 	 height: 1.25rem;
			div{
				height: 30px !important;
				width: 30px !important;
			}
		}
	}
</style>