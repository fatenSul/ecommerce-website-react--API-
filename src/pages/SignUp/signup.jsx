import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { object, string, number } from 'yup';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Import the CSS file

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
    gender: '',
    age: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setUser({
        ...user,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateData();

    if (isValid) {
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('image', user.image);
      formData.append('gender', user.gender);
      formData.append('age', user.age);
      formData.append('phoneNumber', user.phoneNumber);

      try {
        const { data } = await axios.post('https://ecommerce-node4-five.vercel.app/auth/signup', formData);
        setUser({
          userName: '',
          email: '',
          password: '',
          image: '',
          gender: '',
          age: '',
          phoneNumber: '',
        });
        if (data.message === 'success') {
          // Automatically sign in the user after successful sign-up
          const response = await axios.post('https://ecommerce-node4-five.vercel.app/auth/signup', { email: user.email, password: user.password });
          localStorage.setItem('userToken', response.data.token);
          // Redirect to profile page
          navigate('/profile');
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }
  };

  const validateData = async () => {
    const registerSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email("Please enter a valid email").required(),
      password: string().min(6).max(20).required("Please make your password more than 8 characters"),
      image: string().required(),
      gender: string().required(),
      age: number().positive().integer().required(),
      phoneNumber: string().required(),
    });
    try {
      await registerSchema.validate(user, { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      console.log("validate error", error.errors)
      error.errors.forEach(errorMessage => {
        toast.error(errorMessage);
      });
      setErrors(error.errors)
      return false;
    }
  };

  return (
    <div className="register-body">
      <div className='main-body'>
        <div className="register-container"> {/* Apply the container class */}
          <h2 className="register-title">Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-label" htmlFor="userName">User Name</label>
            <input className="register-input" type="text" id="userName" value={user.userName} name="userName" onChange={handleChange} />

            <label className="register-label" htmlFor="email">Email</label>
            <input className="register-input" type="email" id="email" value={user.email} name="email" onChange={handleChange} />

            <label className="register-label" htmlFor="password">Password</label>
            <input className="register-input" type="password" id="password" value={user.password} name="password" onChange={handleChange} />

            <label className="register-label" htmlFor="image">Image</label>
            <input className="register-input" type="file" id="image" name="image" onChange={handleImageChange} />

            <label className="register-label">Gender</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="male" checked={user.gender === 'male'} onChange={handleChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" checked={user.gender === 'female'} onChange={handleChange} />
                Female
              </label>
              <label>
                <input type="radio" name="gender" value="other" checked={user.gender === 'other'} onChange={handleChange} />
                Other
              </label>
            </div>

            <label className="register-label" htmlFor="age">Age</label>
            <input className="register-input" type="number" id="age" value={user.age} name="age" onChange={handleChange} />

            <label className="register-label" htmlFor="phoneNumber">Phone Number</label>
            <input className="register-input" type="text" id="phoneNumber" value={user.phoneNumber} name="phoneNumber" onChange={handleChange} />

            <button className="register-button" type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { object, string, number } from 'yup';
// import { useNavigate } from 'react-router-dom';
// import './signup.css'; // Import the CSS file

// export default function Signup() {
//   const navigate = useNavigate()
//   const [user, setUser] = useState({
//     userName: '',
//     email: '',
//     password: '',
//     image: '',
//     gender: '',
//     age: '',
//     phoneNumber: '',
//   });

//   const [errors, setErrors] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value
//     });
//   };

//   const handleImageChange = (e) => {
//     const { name, files } = e.target;
//     if (files.length > 0) {
//       setUser({
//         ...user,
//         [name]: files[0]
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const isValid = await validateData();

//     if (isValid) {
//       const formData = new FormData();
//       formData.append('userName', user.userName);
//       formData.append('email', user.email);
//       formData.append('password', user.password);
//       formData.append('image', user.image);
//       formData.append('gender', user.gender);
//       formData.append('age', user.age);
//       formData.append('phoneNumber', user.phoneNumber);

//       try {
//         const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/auth/signup`, formData);
//         setUser({
//           userName: '',
//           email: '',
//           password: '',
//           image: '',
//           gender: '',
//           age: '',
//           phoneNumber: '',
//         });
//         if (data.message === 'success') {
//           toast('YOUR ACCOUNT HAS BEEN CREATED SUCCESSFULLY!!, we send link to your email, please confirm! ')
//           navigate('/SignIn')
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error(error.response.data.message);
//       }
//     }
//   };

//   const validateData = async () => {
//     const registerSchema = object({
//       userName: string().min(5).max(20).required(),
//       email: string().email("Please enter a valid email").required(),
//       password: string().min(6).max(20).required("Please make your password more than 8 characters"),
//       image: string().required(),
//       gender: string().required(),
//       age: number().positive().integer().required(),
//       phoneNumber: string().required(),
//     });
//     try {
//       await registerSchema.validate(user, { abortEarly: false });
//       setErrors([]);
//       return true;
//     } catch (error) {
//       console.log("validate error", error.errors)
//       error.errors.forEach(errorMessage => {
//         toast.error(errorMessage);
//       });
//       setErrors(error.errors)
//       return false;
//     }
//   };

//   return (
//     <div className="register-body">
//       <div className='main-body'>
//         <div className="register-container"> {/* Apply the container class */}
//           <h2 className="register-title">Register</h2>
//           <form className="register-form" onSubmit={handleSubmit}>
//             <label className="register-label" htmlFor="userName">User Name</label>
//             <input className="register-input" type="text" id="userName" value={user.userName} name="userName" onChange={handleChange} />

//             <label className="register-label" htmlFor="email">Email</label>
//             <input className="register-input" type="email" id="email" value={user.email} name="email" onChange={handleChange} />

//             <label className="register-label" htmlFor="password">Password</label>
//             <input className="register-input" type="password" id="password" value={user.password} name="password" onChange={handleChange} />

//             <label className="register-label" htmlFor="image">Image</label>
//             <input className="register-input" type="file" id="image" name="image" onChange={handleImageChange} />

//             <label className="register-label">Gender</label>
//             <div className="radio-group">
//               <label>
//                 <input type="radio" name="gender" value="male" checked={user.gender === 'male'} onChange={handleChange} />
//                 Male
//               </label>
//               <label>
//                 <input type="radio" name="gender" value="female" checked={user.gender === 'female'} onChange={handleChange} />
//                 Female
//               </label>
//               <label>
//                 <input type="radio" name="gender" value="other" checked={user.gender === 'other'} onChange={handleChange} />
//                 Other
//               </label>
//             </div>

//             <label className="register-label" htmlFor="age">Age</label>
//             <input className="register-input" type="number" id="age" value={user.age} name="age" onChange={handleChange} />

//             <label className="register-label" htmlFor="phoneNumber">Phone Number</label>
//             <input className="register-input" type="text" id="phoneNumber" value={user.phoneNumber} name="phoneNumber" onChange={handleChange} />

//             <button className="register-button" type='submit'>Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
