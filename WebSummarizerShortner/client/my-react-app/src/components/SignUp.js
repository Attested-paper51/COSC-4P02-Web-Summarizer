import React, { useState } from 'react';
import "./css/SignUpStyle.css";

const SignUp = () => {

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  
  // const [CopyURL, setCopyURL] = useState('Copy URL')
  // const handleCopy = () => {
  //     navigator.clipboard.writeText(shortened)
  //     setCopyURL('Copied')
  //     setTimeout(() => {
  //         setCopyURL('Copy URL');
  //     }, 3000); // Reverts back to 'Submit' after 3 seconds
  // }

  const handleSubmit = (e) => {
      const User = {user} 
      const Pass = {pass}
      console.log(User)
      console.log(Pass)
  }

  return (
    <div className="box">
      <div className="form">
        <div className='form-title'>Create an account</div>
        <div className="form-subtitle">Join us to access to Tailored Summaries, Analytics, API Integration and more!</div>

        <div className="username">
          <label className='user-text'>Enter your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder='Enter email here' 
          />
          {/* <div className="user-text">Your email</div>
          <textfield className="textfield"></textfield> */}
        </div>
      
        <div className="password">
          <label className='pass-text'>Enter your password</label> 
          <input className='textfield'
            type="text" 
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder='Enter password here' 
          />
        </div>

        <div className="password">
          <label className='pass-text'>Re-enter password</label> 
          <input className='textfield'
            type="text" 
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder='Enter password here' 
          />
        </div>

        <button className="signup-btn" onClick={handleSubmit}>
          <div className="signup-overlap">
            <div className="signup">Create an account</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SignUp;