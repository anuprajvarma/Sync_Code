import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { createTheme } from '@uiw/codemirror-themes';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import './Editor.css'

const myTheme = createTheme({
    dark: 'dark',
    settings: {
        background: '#233338',
        //foreground: '#0d0807',
        caret: '#AEAFAD',
        selection: '#87cefa',
        //selectionMatch: '#D6D6D6',
        gutterBackground: '#233338',
        gutterForeground: '#4DD4C',
        gutterBorder: '#233338',
        lineHighlight: '#233338',
    },
    styles: [
        { tag: t.comment, color: '#787b80' },
        { tag: t.definition(t.typeName), color: '#194a7b' },
        { tag: t.typeName, color: '#194a7b' },
        { tag: t.tagName, color: '#008a02' },
        { tag: t.variableName, color: '#1a00db' },
    ],
});

const Editor = () => {

    return (
        <CodeMirror height="100vh" theme={myTheme} extensions={[javascript({ jsx: true })]} />
    )
}

export default Editor
