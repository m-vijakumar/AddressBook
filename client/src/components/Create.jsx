import React ,{useState , useEffect} from 'react'
import AdminNavbar from './AdminNavbar';

export default function Create(props) {

  const [postData, setPostData] = useState({});
  const [postContent, setPostContent] = useState("");
  // const [message, setMessage] = useState("");
  const [isSpinner,setSpinner] =useState(true);
  // const [show,setShow] =useState(false);
  const [isSpinner1,setSpinner1] =useState(false);
  const userlog= async ()=>{
    try{
    const resp = await fetch("/api/admin/auth/verfiy");
    const data = await resp.json();
    // console.log(data)
         if(data.success === false){
            props.history.push("/login");
         }
    }catch(e){
        console.log(e);
        props.history.push("/login");
        
    }
    }

    const getContent = (content)=>{
            setPostContent(content)
    }

    const handleChange = e => {
   
        setPostData({ ...postData, [e.target.name]: e.target.value });
      };

      useEffect(()=>{
        // console.log("sssss")
        userlog();
        setSpinner(false)
    },[])
      const handleSubmit = async (e) => {
         
        try{
        if( !postData.title ||! postData.imgsrc ){
    
          alert("fill the details")
        }else{
            
        const postdata = {
         
          title : postData.title,
          imgsrc: postData.imgsrc,
          description : postData.description
        };
     
        setSpinner1(true)
        e.persist();
        const response = await fetch('/api/admin/product/create' , {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
    
        },
        mode:"cors",
        body :JSON.stringify(postdata)
      })
      const data = await response.json();
      // console.log(data)
      if (data.error === false) {
       
        // console.log(data.success)
        alert("Product Added");
         props.history.push("/dashboard");
         setSpinner1(false)
        
      }else{setSpinner1(false) ;alert(data.msg) }
    
        }
      }catch(e){setSpinner1(false) ;
         alert("Internal Error...")
         console.log(e)
        }
      }

      const sp1 =  <button className="btn btn-primary float-right" type="button" disabled>
      <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Adding...
    </button>
    
    const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Add Product"} className="btn btn-primary float-right" onClick={handleSubmit} />
        if (isSpinner) {
          return (
            <div className="d-flex justify-content-center " >
              <div className="spinner-border" role="status" id="spinner">
                  <span className="sr-only">Loading...</span>
              </div>
            </div> 
          )
      }else{
        return(
            
        <>
        <AdminNavbar />
        <div>
            
            
            <div onChange={handleChange} className="container">
            
            <div class="form-group ">
            <label >Title</label>                
                <input type="text" class="form-control md-2" name="title"  placeholder="title"/>
            </div>
            <div class="form-group ">
            <label >imgsrc</label>                
                <input type="text" class="form-control md-2" name="imgsrc" placeholder="imgsrc"/>
            </div>
            <div class="form-group ">
            <label >Description</label>                
            <textarea rows="3" cols="15" className="form-control" name="description" placeholder="description"></textarea>
            </div>
            </div>
            
            <div className="container " >{isSpinner1 ? sp1 :sp }</div>
        </div>
          
        </>
    )
}
}