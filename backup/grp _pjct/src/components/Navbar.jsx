import  React from 'react'
import "../styles/Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
       
        <nav className="Navbar">  
        <h3>Q&A </h3>
       {/*  <span className="span_tag"></span> */}
      
        
       <div className="auth_btn ">
       <button type="button" class="btn btn-primary btn-sm h-55  d-flex align-items-center   " >Login</button>&nbsp;
       <button type="button" class="btn btn-secondary btn-sm h-55 d-flex align-items-center">signup</button>&nbsp;
       <button type="button" class="btn btn-dark btn-sm h-55 d-flex align-items-center">Logout</button>&nbsp;
       </div>
     
        </nav>  
       
  
      
       
       
    );
  }
  
  export default App;