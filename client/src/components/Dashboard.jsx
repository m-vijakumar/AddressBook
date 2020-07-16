import React, { useEffect ,useState} from 'react'
import AdminNavbar from './AdminNavbar'
import "./../App.css"
import Postdetails from './Postdetails';


export default  function Dashboard(props) {

    const [isSpinner1,setSpinner1] =useState(false);
    const [isSpinner,setSpinner]=useState(true);
    const [address,setAddress]=useState([]);
    const [autoList,setAutoList]=useState([]);
    const [findKey  ,setFindKey]=useState(null);
    const userlog= async ()=>{

    try{
    const resp = await fetch("/api/auth/verfiy");
    const data = await resp.json();
    if(data.success === false){
      return props.history.push("/login");
     }
    }catch(e){
        // console.log(e);
       return props.history.push("/login");
    }
    }
    const getAllAddress = async()=>{

        try {
          const resp = await fetch("api/address/all-address");
          const addressData = await resp.json();
          if(addressData.data.addresses){
            await setAddress(addressData.data.addresses)
          }
        } catch (error) {
          return props.history.push("/login");
        }
        
         
        // console.log(postsData)
        
    }
    const updateAddress =async(id,name) =>{
        setSpinner1(true)
        props.history.push(`/contact/update/${id}/${name}`)
        setSpinner1(false)
      

    }
    const delAddress = async(id) =>{
        try{
            if( !id  ){
        
              alert("Internal Error...!")
            }else{
            setSpinner1(true)
            // e.persist();
            const response = await fetch('api/address/delete' , {
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
            
             await getAllAddress()
             
             setSpinner1(false)
             
            //return <Redirect to="/Dashboard" />
            
          }else{setSpinner1(false) ;alert("error"+data.msg) }
        
            }
          }catch(e){setSpinner1(false) ;
             alert("Internal Error...")
            //  console.log(e)
            }
        setSpinner1(false)
          alert("Contact Deleted...!")
    }

    const  ss = async(e) =>{
      var auto=address;
      setAutoList(address)
    
      if(e.target.value != null){
        setFindKey(e.target.value)
         auto = address.filter(address =>{
        const regex = new RegExp(`^${e.target.value}`,'gi');
        // const regex = new RegExp(`/\B${e.target.value}\B/`,'gi');
        // const regex = new RegExp("/\[(.*?)\]/gi");
        return address.name.match(regex) || address.phoneno.match(regex) ; 
      })
      setAutoList(auto);
      console.log(auto);
      }
       
      
      };
      // console.log(autoList);
    
    const showAutoList = autoList.map((post)=>{

         return <Postdetails key={post._id} post={post} updateAddress={updateAddress} delAddress={delAddress}/>
    })
    const showAddress = address.map((post)=>{

         return <Postdetails key={post._id} post={post} updateAddress={updateAddress} delAddress={delAddress}/>
    })

   const sp = <div className="spinner-border " role="status" id="spinner" style={{backgroundColor:"transparent"}}>
   <span className="sr-only">Loading...</span>
   </div> 
    useEffect(()=>{
        // console.log("sssss")
        const aboutController = new AbortController()
        userlog();
         getAllAddress();
        
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
        <div className="d-flex justify-content-end mr-3" >
              <a href="/contact/create"><button className="btn btn-primary"><h5>Add</h5></button></a>
            </div>
            <br />
            <div class="form-group ">
                          
              <input type="text" class="form-control md-2" name="find"  placeholder="Find name Or number ......" onChange={ss}/>
          </div>
            
            {findKey ? showAutoList : showAddress}
            
            
        </div>
       
        </div>
        
    )
    }
}
