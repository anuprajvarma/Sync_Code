import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = ({socketRef,roomId, onCodeChange}) => {

    const editorRef = useRef(null);

    useEffect(()=>{
        async function init(){
            editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
                mode: {name: 'javascript' , json: true},
                theme: 'dracula',
                autoCloseBrackets: true,
                autoCloseTags: true,
                lineNumbers: true,
            })

            editorRef.current.on('change',(instance,changes)=>{
                //console.log('changes',changes)
                const {origin}= changes;
                const code = instance.getValue();
                onCodeChange(code)
                if(origin!=='setValue'){
                    socketRef.emit('codeChange',{
                        roomId,
                        code,
                    })
                } 
            });
        }
        init();
    },[]);

    useEffect(()=>{
        if(socketRef){
            socketRef.on('codeChange',({code})=>{
                console.log('receving',code)
                if(code!==null){
                    editorRef.current.setValue(code);
                }
            })
        }
    },[socketRef])

    return (
        <textarea id='realtimeEditor'></textarea>
    )
}

export default Editor
