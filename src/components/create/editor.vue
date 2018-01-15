<template>
	<div id="editor">
        <div class="create-title">
        <h6>标题</h6>
		<input type="text"  placeholder="title"/>
        </div>
        <div class="select-type">
        <h6>分类</h6>
        	   <v-chip  ref="btnIndex" v-for="(tag,index) in tags" label small outline color="blue" @click="setShareTag(tag,index)">{{tag}}</v-chip>
        </div>
		<quill-editor class="editor-tool" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">		
		</quill-editor>
		    <div class="commit-btn">
                <v-btn  color="teal lighten-1" dark>发布</v-btn>
             </div>
	</div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import { quillEditor } from 'vue-quill-editor'
	export default {
		name: '',
		created() {

		},
		data() {
		return {
		tags :['分享','问答','招聘','测试'],
		items:['all','good','share','ask','job'],
        shareTag:'',
        content: ``,
        editorOption: {
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'align': [] }],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'color': [] }, { 'background': [] }],
              ['image']
            ]
          }
        }
     }
		},
		components: {
			quillEditor
		},
		methods: {
			setShareTag(tag,index){
				this.shareTag = tag
				this.$refs.btnIndex.forEach(function(item){
					if(item.$el.classList.contains('chip--selected')){
						item.$el.classList.remove('chip--selected')
					}
				})
				this.$refs.btnIndex[index].$el.classList.add('chip--selected')
			},
			onEditorBlur(quill) {
				console.log('editor blur!', quill)
			},
			onEditorFocus(quill) {
				console.log('editor focus!', quill)
			},
			onEditorReady(quill) {
				console.log('editor ready!', quill)
			},
			onEditorChange({
				quill,
				html,
				text
			}) {
			 	console.log('editor change!', quill, html, text)
				this.content = html
			}
		},
		watch: {},
	 computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
	}
</script>

<style lang="less" scoped="scoped">
	#editor {
		text-align: left;
		.create-title{
			margin-top: 0.312rem;
		}
		 h6{
			margin-top: 0.312rem;
			margin-left: 0.312rem;
			color:  #696969;
			display: inline-block;
		}
		input {
			width:7.5rem;
			height:0.781rem;
			text-indent: .5em;			
			outline: none;
			line-height: 0.781rem;
			margin: auto;
			margin-top: 0.312rem;
			font-size: 0.437rem;
			border: 1px solid #ccc;
			border-radius: 0.156rem;
			display: inline-block;
		}
		.editor-tool{
			height: 7.5rem;
			text-align: left;
			 .ql-toolbar.ql-snow{
				border-color: #eee;
			}
		}
		.select-type{
			width: 100%;
			margin: 0.312rem auto;
			border-top: 1px solid #eee;
		}
		.commit-btn{
             width: 100%;
             margin-top: 1.875rem;
             padding-top: 0.468rem;
             button{
             	display: block;             
             	margin: 0 auto;
             	color: #fff;
             }
		}
	}
</style>