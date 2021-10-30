import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    console.log(email, password);
    if (password.length < 6) {
      setError(" Password should be at least 6 characters")
      return;
    }

    const processLogin = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          // Signed in 
          const user = result.user;
          console.log(user);
        })
    }

    const registerNewUser = (email, password) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          verifyEmail();
        })
    }
    isLogin ? processLogin(email, password) : registerNewUser(email, password);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const toggleLogin = e => {
    setIsLogin(e.target.checked);
  }

  const verifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log(result);
        // Email verification sent!
      });
  }

  const handleResetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        // console.log(result);
        // Password reset email sent!
      })
  }
  return (
    <div className="m-5 p-5 w-50">
      <form onSubmit={handleRegister}>
        <div className="row mb-3">
          <h3 className="text-primary">Please {isLogin ? "Login" : "Sign Up"}</h3>
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input required onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input required onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>

        <div className="row mb-3 text-danger">{error}</div>
        <button type="submit" className="btn btn-primary">{isLogin ? "Login" : "Sign Up"}</button>
        <button onClick={handleResetPassword} type="button" className="btn btn-secondary m-3 btn-sm">Reset Password</button>

      </form>
      <hr /> <br /><br /><br />
      {/* <button onClick={handleSignIn}>Google Sign In</button> */}
    </div>
  );
}

export default App;