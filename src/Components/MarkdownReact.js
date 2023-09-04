import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';

function MarkdownReact () {

    const [markdown,setMarkdown]=useState("This is MarkDown");


    return (
        <>
     <div className="centerText">
        <textarea className="leftSide" value={markdown}  onChange={(e)=> setMarkdown(e.target.value)}>  </textarea>
            <div className="rightSide"><ReactMarkdown>{markdown}</ReactMarkdown></div>
     </div>
        
        </>
    )


}
export default MarkdownReact;