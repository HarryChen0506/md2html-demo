import React from 'react'
import ReactDOM from 'react-dom'
import Demo from './Demo'
import './index.less'

class Home extends React.Component { 
  render () {
    return (
      <div className="page-wrap">
        <div className="banner">
          <h3 className="title">rc-md2html</h3>
          <p className="decs">A React component for converting Markdown into HTML, light and powerful.</p>
          <div className="link">
            <a className="button-item github"><span className="icon-github"></span></a>
            <a className="button-item"><span className="button">doc</span></a>            
          </div> 
        </div>
        <div className="demo-wrap">
          <Demo />
        </div>        
      </div>      
    )
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
)