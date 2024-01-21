"use client"
import {useState, useEffect } from 'react'
import NodeCards from './NodeCards'

export default function AccountPage(props) {

    const [userPosts, setUserPosts] = useState([])
    useEffect(() => {
        getAllPosts().then((data) => {
            let arr = Array.from(data); 
            setUserPosts(arr)
        })
    }, [])
    console.log(userPosts)
    const userSession = props.user
    const getAllPosts = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/user/allposts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user":userSession.user.email
                }),
            })

            const data = await response.json()
            return data
           
        } catch (err) {
            console.log(err)
        }
    }

    return <div className='w-[80%] h-dvh flex flex-col m-auto'>
        <h1>Hello {userSession.user.name}</h1>
        <p>Your Posts:</p>
        {userPosts.map((card) => {
            let post = new Object
            post.title = card.title
            post.body = card.description
            post.url = card.link
            console.log(post)
            return <>
            <NodeCards post={post} />
            </>
        })}
    </div>
}