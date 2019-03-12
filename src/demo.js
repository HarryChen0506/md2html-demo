import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import content  from './content.js'
import './demo.less'

// const mock_content = "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it."
const mock_content = content

class Demo extends React.Component {

  mdEditor = null

  handleEditorChange = ({html, text}) => {
    // console.log('handleEditorChange', text)
  }

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
        return new Blob([u8arr], {type:mime})
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

  render () {
    return (    
      <div className="editor-wrap">
        <nav className="nav">
          <button onClick={this.handleGetMdValue} >getMdValue</button>  
          <button onClick={this.handleGetHtmlValue} >getHtmlValue</button>  
        </nav>
        <MdEditor 
          ref={node => this.mdEditor = node}
          value={mock_content}
          style={{height: '500px', width: '100%'}}
          config={{
            view: {
              menu: true,
              md: true,
              html: true
            },
            // synchScroll: false
          }}
          onChange={this.handleEditorChange}
          onImageUpload={this.handleImageUpload}
        />  
      </div> 
    )
  }
}

export default Demo