"use client"
import {useState } from 'react'

export default function AddPost() {
    //const title = document.getElementById("postTitle")
    //console.log(title)

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [link, setLink] = useState("")

    const makeRequest = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/posts/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title":title,
                    "desc":desc,
                    "link":link
                }),
            })
            
            return response.json();
        } catch (err) {
            
            console.log(err)
        }
    } 

    return (
        <>
         <div className="flex ">
                    <p>Title:</p>
                    <input id="postTitle" type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} className="grow ml-2 border border-black rounded-md"></input>
                </div>

                <div className="flex">
                    <p>Description:</p>
                    <input id="postDesc" type="text" value={desc} onChange={(e) => {setDesc(e.target.value)}} className="grow ml-2 border border-black rounded-md"></input>
                </div>

                <div className="flex">
                    <p>Link:</p>
                    <input id="postLink" type="text" value={link} onChange={(e) => {setLink(e.target.value)}} className="grow ml-2 border border-black rounded-md"></input>    
                </div>
    <button onClick={() => makeRequest()}>Submit</button>
    </>
    )
    }
