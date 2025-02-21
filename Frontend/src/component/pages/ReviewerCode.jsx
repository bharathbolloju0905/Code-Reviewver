import React from 'react'
import { useEffect, useState } from 'react';

import prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor"
import Markdown from 'react-markdown'
import toast from 'react-hot-toast';
import NavBar from '../pages/NavBar';

const ReviewerCode = () => {

    const [code, setcode] = useState(`REVIEW YOUR CODE HERE example: 
         
    function Add(){ 
    
        return a+b ;

        }`);
    const [Loading, setLoading] = useState(false);
    const [result, setResult] = useState('')
    useEffect(() => {
        prism.highlightAll();
    })

    async function handleReview() {
        try {
            setLoading(true)
            if (!code) {
                setLoading(false);
                
                return toast.error('Code is required');
                return ;
            }

            const response = await fetch(`http://localhost:3000/ai/code-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code }),
                credentials: 'include'
            })
            console.log(response)
            const data = await response.json();
            setResult(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
 
    return (
        <>
        <div className='body'>
            <div> <NavBar></NavBar></div>          
     
            <div className="left">
                {Loading && <div className="loading">Loading...</div>}
                <div className="code">
                    <Editor
                        value={code}
                        onValueChange={(code) => setcode(code)}
                        highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                            border: '1px solid black',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </div>
                <div className="button">
                    <button onClick={handleReview}>Review</button>
                </div>
            </div>
            <div className="right hide-scroll"><Markdown>{result}</Markdown> </div>
            </div></>
    )
}

export default ReviewerCode ;