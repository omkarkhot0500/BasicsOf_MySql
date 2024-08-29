import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import "../style.css"

const Books = () => {

  const [books,setBooks] = useState([])

  useEffect(()=>{
    const fecthAllBooks = async () => {
      try{
        const res =await axios.get("http://localhost:8800/books")
        console.log(res.data)
        setBooks(res.data)
      }
      catch{
        console.log(err)
      }
    }
    fecthAllBooks()
  },[])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Books from MySql</h1>
      <div className="books" >
        {books.map(i=>(
          <div key={i.id} className="book">
            {i.cover && <img src={i.cover} />}
            <h2>{i.title}</h2>
            <p>{i.desc}</p>
            <span>{i.price}</span>
            <button className='delete' onClick={()=>handleDelete(i.id)}>Delete</button>
            <button className='update'><Link to={`/update/${i.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button><Link to="/add">Click to add new book</Link></button>
    </div>
    
  )
}

export default Books
