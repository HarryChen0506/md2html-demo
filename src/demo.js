import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
// import MdEditor from 'react-markdown-editor-lite/lib/index.nostyle'
// import 'react-markdown-editor-lite/lib/index.css'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
// import 'highlight.js/styles/github.css'
import content from './content.js'
import content1 from './content.1.js'
import 'react-markdown-editor-lite/lib/index.css'
import './demo.less'

// const mock_content = "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it."
const MOCK_DATA = [content, content1]

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) { }
        }
        return '' // use external default escaping
      }
    })
      .use(emoji)
      .use(subscript)
      .use(superscript)
      .use(footnote)
      .use(deflist)
      .use(abbreviation)
      .use(insert)
      .use(mark)
      .use(tasklists, { enabled: this.taskLists })
  }
  mdParser = null
  mdEditor = null

  state = {
    content: MOCK_DATA[1]
  }

  handleEditorChange = ({ html, text }) => {
    console.log('handleEditorChange', text, html)
  }

  renderHTML = (text) => {
    // 模拟异步渲染Markdown
    // return () => {
    //   return this.mdParser.render(text)
    // }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mdParser.render(text))
      }, 0)
    })
  }

  /* 
  handleImageUpload = (file, callback) => {
    const reader = new FileReader()
    reader.onload = () => {
      const convertBase64UrlToBlob = (urlData) => {
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
      }
      const blob = convertBase64UrlToBlob(reader.result)
      setTimeout(() => {
        // setTimeout 模拟oss异步上传图片
        // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
        const imageList = [
          'https://www.baidu.com/img/bd_logo1.png?qua=high',
          'https://mat1.gtimg.com/pingjs/ext2020/qqindex2018/dist/img/qq_logo_2x.png',
          'https://avatars0.githubusercontent.com/u/21263805'
        ]
        const imageUrl = imageList[Math.floor(Math.random() * imageList.length)]
        callback(imageUrl)
      }, 1000)
    }
    reader.readAsDataURL(file)
  }
  */
  
  handleImageUpload = (file) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        // @ts-ignore
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };


  onCustomImageUpload = () => {
    return new Promise((resolve, reject) => {
      const result = window.prompt('Please enter image url here')
      resolve({ url: result })
    })
  }

  handleSetContent = (type = 0) => {
    this.setState({
      content: MOCK_DATA[type]
    })
  }

  handleGetMdValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getMdValue())
    }
  }

  handleGetHtmlValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getHtmlValue())
    }
  }

  render() {
    const { content } = this.state
    return (
      <div className="editor-wrap">
        <nav className="nav">
          <div className="left">
            <button onClick={this.handleSetContent.bind(this, 1)} >README</button>
            <button onClick={this.handleSetContent.bind(this, 0)} >DEMO</button>
          </div>
          <div className="right">
            <button onClick={this.handleGetMdValue} >API.getMdValue</button>
            <button onClick={this.handleGetHtmlValue} >API.getHtmlValue</button>
          </div>
        </nav>
        <MdEditor
          ref={node => this.mdEditor = node}
          value={content}
          style={{ height: '450px', width: '100%' }}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true
            },
            syncScrollMode: ['rightFollowLeft']
          }}
          renderHTML={this.renderHTML}
          onChange={this.handleEditorChange}
          onImageUpload={this.handleImageUpload}
          // onCustomImageUpload={this.onCustomImageUpload}
        />
      </div>
    )
  }
}

export default Demo