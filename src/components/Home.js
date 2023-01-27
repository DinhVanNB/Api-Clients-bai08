import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home(){
   let [books, getBooks] = useState([]);
   let navigate = useNavigate();
   useEffect(
    ()=>{
        axios.get("https://my-json-server.typicode.com/codegym-vn/mock-api-books/books")
    .then(res=>getBooks(res.data))
    .catch(e=>alert(e))
    }
   ,[])

   const onClick=(e)=>{
        e.target.id ? navigate(`/edit/${e.target.id}`): navigate(`/add`)
   }
    
   const onDelete=(e)=>{
        if(window.confirm(`Bạn có chắc chắn muốn xóa book có id: ${e.target.id}`)){
            getBooks(books.filter(book=> +book.id!==+e.target.id));
            axios.delete(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${e.target.id}`)
            .then(res=>alert(res.status))
            .catch(e=>console.log(e))
        }
   }

    return(
        <div className='container p-5'>
            <h4 className='d-inline-block'>Library</h4>
            <button onClick={onClick} 
                    className='btn btn-success float-end'>Add a new book</button>
            <div className='container mt-5'>
                <table 
                    className="table 
                                table-striped table-inverse 
                                table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th className='w-65'>Title</th>
                            <th className='text-center'>Quantity</th>
                            <th style={{width:"15%"}}  
                                className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map(book=>(
                                <tr key={book.id}>
                                    <td >{book.title}</td>
                                    <td 
                                        className='text-center'>{book.quantity}
                                    </td>
                                    <td  
                                        className=' btn-group 
                                                    d-flex flex-row 
                                                    justify-content-center'>
                                        <button id={book.id} onClick={onClick}
                                                className=' btn btn-warning '>
                                                 Edit
                                        </button>
                                        <button id={book.id} onClick={onDelete}
                                                 className=' btn btn-danger'
                                                >Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}