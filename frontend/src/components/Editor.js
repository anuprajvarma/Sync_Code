import React, { useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import './Editor.css'

const Editor = () => {



    return (
        <CodeMirror height="100vh" extensions={[javascript({ jsx: true })]} />
    )
}

export default Editor
