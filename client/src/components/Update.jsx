import React ,{useState ,useEffect}from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
export default function Update(props) {
    const [content, setContent] = useState({});
    const [editButton ,setEditButton] = useState({title:true,imgsrc:true,description:true})
    const [postId , setPostId] = useState("");
    const [message, setMessage] = useState("");
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);
    const location = useLocation();
    const history = useHistory();

    const handleChange = e => {
   
      setContent({ ...content, [e.target.name]: e.target.value });
    };
    const getPostContent = async(e)=>{
        // e.persist();
        // console.log(postId)
        try{
        const response = await fetch('/api/admin/product/post' , {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

            },
            mode:"cors",
            
            body :JSON.stringify({postId:location.pathname.split("/")[3]})
        })
    
        const data = await response.json();
        if (data.error === false) {
          setContent(data.data)
        } else {
          alert("error..!");
          props.history.push("/dashboard");
        }
        // console.log(data.data)
      }catch(err){
        alert("error..!");
        props.history.push("/dashboard");
      }

    }


    useEffect(()=>{

      
        try {
            
            setPostId(location.pathname.split("/")[3]);
            getPostContent();
            setSpinner(false)
        } catch (error) {
            history.push("/")
        }

    },[])      

    const getContent = (content)=>{
        setContent(content)
    }
    const handleSubmit = async (e) => {
         
        try{
        if( !postId ||!content.title ||!content.imgsrc ||!content.description){
    
          setMessage("fill the details")
        }else{
            
        const postdata = {
         
          postId: postId,
          title : content.title,
          imgsrc:content.imgsrc,
          description:content.description,
        };
    //  console.log(postdata)
        setSpinner1(true)
        e.persist();
        const response = await fetch('/api/admin/product/update' , {
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
         props.history.push("/dashboard");
         setSpinner1(false)
        //  setShow(true)
        //return <Redirect to="/Dashboard" />
        
      }else{setSpinner1(false) ;alert("intrnal Error...!") }
    
        }
      }catch(e){setSpinner1(false) ;
         alert("Internal Error...")
        //  console.log(e)
        }
      }
      
      const sp1 =  <button className="btn btn-primary float-right " type="button" disabled>
      <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Updating...
    </button>
    
    const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Update Product"} className="btn btn-primary float-right" onClick={handleSubmit} />
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
              <input type="text" class="form-control md-2" name="title"  placeholder="title" defaultValue={content.title}/>
          </div>
          
          <div class="form-group ">
          <label >imgsrc</label>                
              <input type="text" class="form-control md-2" name="imgsrc" placeholder="imgsrc" defaultValue={content.imgsrc}/>
          </div>
          <div class="form-group ">
          <label >Description</label>                
          <textarea rows="3" cols="15" className="form-control" name="description" placeholder="description" defaultValue={content.description}></textarea>
          </div>
          </div>
          
          <div className="container " >{isSpinner1 ? sp1 :sp }</div>
      </div>
          
        </>
    )
}
}
