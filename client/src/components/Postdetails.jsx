import React from 'react'
import '../Admin.css'
function Postdetails(props) {

  const updatePost =() =>{
        props.updatePost(props.post._id,props.post.title)   
  }
  const delPost = async() =>{
    props.delPost(props.post._id)
  }


    return (

        <div className="postStyle ">
           
            <h6>  
             {"  "}{props.post.title}
             <button onClick={delPost} className="delButton" value={props.post._id}>delete</button>
             <button onClick={updatePost} className="updateButton mr-3">update</button>
             
             </h6>
             
        </div>
    );
}

export default Postdetails;
