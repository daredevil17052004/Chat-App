import React from 'react'
import {useState, useEffect} from 'react'
// import { sendMessage } from '../../../Backend/controllers/message.controller'
import useConversation from '../zustand/useConversation'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const {messages, setMessages, selectedConversation} = useConversation()

  useEffect(()=>{
    const getMessages = async () => {
      setLoading(true)
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/messages/${selectedConversation._id}`,{
          credentials: "include",
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setMessages(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    if(selectedConversation?._id) getMessages();

  },[selectedConversation?._id,setMessages])

  return {messages, loading}
}

export default useGetMessages