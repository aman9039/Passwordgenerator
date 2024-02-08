import { useCallback, useState ,useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumberAllowed] = useState(false)
  const [char, setCharAllowed] = useState(true)
  const [Password, setPassword] = useState('')

  // useRef hook 
  const passwordRef = useRef(null)

  //useCallback hook 
 const passwordgenerator =  useCallback(()=>{
  let pass = "";
  let str = "ABCDEFGHIJKLOPQRSTUVWXYZabcdefghijklopqrstuvwxyz";
  if(number) str += "0123456789"
  if(char) str += "@#$%^&*+=-><?/|!~"
  for(let i=1; i<= length; i++){
    let charnum = Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(charnum)
  }
  setPassword(pass)
 },[length , number ,char,setPassword])

 // copyPasswordToClipboard function to copy the password 

const copyPasswordToClipboard = useCallback(()=> {
  // select the copy password
  passwordRef.current?.select();
  // selection range to copy the password
  passwordRef.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(Password)
},[Password])

 useEffect(()=>{
  passwordgenerator();
 },[length,number,char,setPassword])
  return (
    <>
 
   <div className='w-full max-w-md shadow-3xl rounded-lg px-4 my-14 bg-gray-200 text-blue-800 mx-auto py-6'>
   <h1 className='text-center text-2xl font-bold text-black my-10 underline'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 my-10 '>
      <input 
      type="text"
      value={Password}
      className=' w-full outline-none py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button onClick={copyPasswordToClipboard} className=' bg-blue-700 px-3 py-0.5 shrink-0 text-white  '>Copy</button>
    </div>
    <div className='flex text-sm gap-x-1'>
   <div className='flex items-center gap-x-1'>
    <input type="range" min={6} max={10} value={length} className='cursor-pointer' 
     onChange={(e)=>{setLength(
        e.target.value)
     }}
     />
     <label>Length:{length}</label>
   </div>
   <div className='flex text-sm gap-x-1'>
    <input type="checkbox" 
    defaultChecked={number} id='numberInput'
    onChange={()=>{
      setNumberAllowed((prev) =>!prev);
    }}
    />
    <label htmlFor='numberInput'>Number</label>
   </div>
   <div className='flex text-center gap-x-1 '>
    <input type="checkbox"  id="characterInput"
    defaultChecked = {char}
    onChange={()=>setCharAllowed((prev)=> !prev)}
    />
    <label htmlFor="characterInput">Characters</label>
   </div>
    </div>
    </div>
   
    </>
  )
}

export default App
