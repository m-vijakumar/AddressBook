import React from 'react'
import '../Admin.css'
function Postdetails(props) {

  const updateAddress =() =>{
        props.updateAddress(props.post._id,props.post.name)   
  }
  const delAddress = async() =>{
    props.delAddress(props.post._id)
  }


    return (

        <div className="postStyle ">
           
            <h6>  
            <button onClick={delAddress} className="delButton" value={props.post._id}>delete</button>
             <button onClick={updateAddress} className="updateButton mr-3">edit</button>
             {"  "}{props.post.name}<br />
             {"  "}{props.post.phoneno}<br />
             {"  "}{props.post.address}<br />
             
             
             </h6>
             
        </div>
    );
}

export default Postdetails;
