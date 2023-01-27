import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect,useState} from 'react';


export default function Infomation(){
    let navigate = useNavigate();
    let [book,setBook]= useState({});
    let {bookId} = useParams();
    useEffect(()=>{
        if(bookId){
            axios.get(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${bookId}`)
            .then(res=>setBook(res.data))
            .catch(e=>alert(e))
        }
    }
    ,[])

    const onChange=(e)=>{
        setBook({...book,[e.target.name]:e.target.value});
    }
    const onClick=(e)=>{
        e.preventDefault();
        if(bookId){
            axios.put(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${book.id}`,book)
            .then(res=>{alert(`Sửa thành công tại id: ${res.data.id}`)
                navigate('/');
            })
            .catch(e=>console.log(e))
        }
        else{
            axios.post('https://my-json-server.typicode.com/codegym-vn/mock-api-books/books',book)
            .then(res=>{alert(`Thêm mới thành công sách: "${res.data.title}"`)
                navigate('/');
            })
            .catch(e=>console.log(e))
        }
       
    }



    return(
        <div className='container pt-5'>
            <h3>{bookId? 'Edit': 'Add a new Book'}</h3>
            <div className='w-25 mt-5'>
                <form onSubmit={onClick} >
                    <label>Title</label>
                    <input 
                        onChange={onChange}
                        name="title"
                        required  
                        type="text" 
                        defaultValue={bookId? book.title:''} 
                        className="form-control" />
                    <label className='mt-3' >Quantity</label>
                    <input 
                        onChange={onChange}
                        name="quantity"
                        required 
                        type="number" 
                        defaultValue={bookId? book.quantity:''}
                        className="form-control" />
                    <div className='text-center'>
                        <button 
                            className='btn btn-success mt-3 ' 
                            type='submit'>
                            {!bookId? 'Save':'Edit'}
                        </button>
                    </div>
                </form>
               
            </div>
        </div>
    )
}