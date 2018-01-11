<template>
	<div id="Comment">
	  <Comment-Item v-for="info in commentInfo" :info="info"></Comment-Item>
	</div>
</template>

<script>
	import CommentItem from './CommentItem.vue'
	export default {
		name:'',
		props:['commentInfo'],
		components:{
			'Comment-Item':CommentItem
		},
		created(){
          // console.log(this.commentInfo)
		},
		data() {
			return {
                
			}
		},
		methods: {
		},
		watch:{			
			}
	}
</script>

<style lang="less" scoped="scoped">
	#Comment {
		
	}
</style>