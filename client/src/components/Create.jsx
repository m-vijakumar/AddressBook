import React ,{useState , useEffect} from 'react'
import AdminNavbar from './AdminNavbar';

export default function Create(props) {

  const [addressData, setAddressData] = useState({});
  const [addressContent, setAddressContent] = useState("");
  // const [message, setMessage] = useState("");
  const [isSpinner,setSpinner] =useState(true);
  // const [show,setShow] =useState(false);
  const [isSpinner1,setSpinner1] =useState(false);
  const userlog= async ()=>{
    try{
    const resp = await fetch("/api/auth/verfiy");
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
            setAddressContent(content)
    }

    const handleChange = e => {
   
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
      };

      useEffect(()=>{
        // console.log("sssss")
        userlog();
        setSpinner(false)
    },[])
      const handleSubmit = async (e) => {
         
        try{
        if( !addressData.name ||! addressData.phoneno ){
    
          alert("fill the details")
        }else{
            
        const addressdata = {
                
          name : addressData.name,
          phoneno:addressData.phoneno,
          address:addressData.address,
        };
     
        setSpinner1(true)
        e.persist();
        const response = await fetch('/api/address/add' , {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
    
        },
        mode:"cors",
        body :JSON.stringify(addressdata)
      })
      const data = await response.json();
      // console.log(data)
      if (data.error === false) {
       
        // console.log(data.success)
        alert("Contact Added");
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
    
    const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Add Contact"} className="btn btn-primary float-right" onClick={handleSubmit} />
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
            <label >Name</label>                
                <input type="text" class="form-control md-2" name="name"  placeholder="name"/>
            </div>
            <div class="form-group ">
            <label >Phone No</label>                
                <input type="number" class="form-control md-2" name="phoneno" placeholder="phoneno" onInput={(e) => e.target.value = e.target.value.slice(0, 12)}/>
            </div>
            <div class="form-group ">
            <label >Address</label>                
            <textarea rows="3" cols="15" className="form-control" name="address" placeholder="Address"></textarea>
            </div>
            </div>
            
            <div className="container " >{isSpinner1 ? sp1 :sp }</div>
        </div>
          
        </>
    )
}
}