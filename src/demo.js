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
        />  
      </div> 
    )
  }
}

export default Demo