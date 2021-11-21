import React from 'react'
import "./Content.css"

function Content(props) {
    return (
        <div className="title-main">
            <span className="ico-title"><ion-icon name="albums-outline"></ion-icon></span>
            <span className="module">{props.modulo}</span>
            <span className="site">/</span>
            <span className="site">{props.site}</span>
        </div>
    )
}

export default Content
