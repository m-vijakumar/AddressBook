import React, { useEffect ,useState} from 'react'
import AdminNavbar from './AdminNavbar'
import "./../App.css"
import Postdetails from './Postdetails';


export default  function Dashboard(props) {

    const [isSpinner1,setSpinner1] =useState(false);
    const [isSpinner,setSpinner]=useState(true);
    const [posts,setPosts]=useState([]);
    const userlog= async ()=>{

    try{
    const resp = await fetch("/api/admin/auth/verfiy");
    const data = await resp.json();
    if(data.success === false){
        props.history.push("/login");
     }
    }catch(e){
        // console.log(e);
        props.history.push("/login");
    }
    }
    const getAllPosts = async()=>{
        const resp = await fetch("/api/admin/product/all-posts");
        const postsData = await resp.json();
        await setPosts(postsData.data)
        // console.log(postsData)
        
    }
    const updatePost =async(id,name) =>{
        setSpinner1(true)
        props.history.push(`/post/update/${id}/${name}`)
        setSpinner1(false)
      

    }
    const delPost = async(id) =>{
        try{
            if( !id  ){
        
              alert("Internal Error...!")
            }else{
            setSpinner1(true)
            // e.persist();
            const response = await fetch('/api/admin/product/delete' , {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
        
            },
            mode:"cors",
            body :JSON.stringify({postId:id})
          })
          const data = await response.json();
          // console.log(data)
          if (data.error === false) {
           
            // console.log(data.success)
            
             await getAllPosts()
             
             setSpinner1(false)
             
            //return <Redirect to="/Dashboard" />
            
          }else{setSpinner1(false) ;alert("error"+data.msg) }
        
            }
          }catch(e){setSpinner1(false) ;
             alert("Internal Error...")
            //  console.log(e)
            }
        setSpinner1(false)
          alert("Post Deleted...!")
    }

    const showPosts = posts.map((post)=>{

         return <Postdetails key={post._id} post={post} updatePost={updatePost} delPost={delPost}/>
    })

   const sp = <div className="spinner-border " role="status" id="spinner" style={{backgroundColor:"transparent"}}>
   <span className="sr-only">Loading...</span>
   </div> 
    useEffect(()=>{
        // console.log("sssss")
        const aboutController = new AbortController()
        userlog();
         getAllPosts();
        
        setSpinner(false)

        return ()=>aboutController.abort()
    },[])
    if (isSpinner) {
        return (
          <div className="d-flex justify-content-center " >
            <div className="spinner-border" role="status" id="spinner">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        )
    }else{
    return (
        <div>
        <AdminNavbar />
        
        {isSpinner1? sp : ''}
        <div className="AdminApp">
        <h1>Welcome</h1>
        <div className="d-flex justify-content-end" >
              <a href="/post/create"><button className="btn btn-primary"><h5>Create</h5></button></a>
            </div>
            <br />
            
            {showPosts}
            
            
        </div>
       
        </div>
        
    )
    }
}
