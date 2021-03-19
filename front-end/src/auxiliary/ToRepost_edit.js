import './ToRepost_edit.css'
import React, { useState, useEffect } from 'react'
// import { Link, useHistory } from 'react-router-dom'


const ToRepost_edit = (props) => {

    const [state, setState] = useState({
        showPlatforms: false,
      })

    const _showPlatforms = () => {
        let cur = state.showPlatforms
        setState({
            showPlatforms: !cur
        });
    };
    return (
        <>
            <input type="text" name = "repost_edit_text" />
            <button className = "enterPost_edit" onClick = {_showPlatforms.bind()}>Enter</button>
            {state.showPlatforms && (
              <>
                {props.data.map((item) => (
                    <button>{item.platforms}</button>
                ))}
              </>
            )}
        </>
    )
}
export default ToRepost_edit;