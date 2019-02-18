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
          <p className="decs">A React component for converting Markdown into HTML, light and powerful...</p>
          <div className="link">
            <a className="button-item github" href="https://github.com/HarryChen0506/rc-md2html" target="_blank">
              <span className="icon icon-github"></span>
              <span className="text">github</span>
            </a>
            <a className="button-item npm" href="https://www.npmjs.com/package/rc-md2html" target="_blank">
              <span className="icon icon-npm"></span>
              <span className="text">npm</span>
            </a>  
            <a className="button-item book" href="https://github.com/HarryChen0506/rc-md2html/blob/master/README.md" target="_blank">
              <span className="icon icon-book"></span>
              <span className="text">doc</span>
            </a>            
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