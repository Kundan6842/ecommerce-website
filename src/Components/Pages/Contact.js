import React,{useRef} from 'react'

const Contact = (props) => {
  const nameRef = useRef('');
  const lastnameRef = useRef('');



  const submitHandler =(event)=>{  
    event.preventDefault();
    const data1 = {
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
    };
    console.log(data1);
    props.onAddData(data1);
  } 
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="fname">First name</label>
        <input type="text" id='fname'  ref={nameRef}/><br />
        <label htmlFor="lname">Last Name</label><br />
        <input type="text" id='lname' ref={lastnameRef} />
        <button type='submit' >submit</button>
      </form>
    </div>
  )
}

export default Contact
