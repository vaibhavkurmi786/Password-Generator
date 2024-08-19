import React, { useState, useCallback, useEffect, useRef } from "react";

const App = () => {

  const [value, settValue] = useState(8);
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [state, setState] = useState(false)
  const [password, setPassword] = useState("")
  const buttonRef = useRef(null)

  const setTheValue = (e) => {
    settValue(e.target.value)
    setLength(e.target.value)
  }


  const randomStringGenerator = useCallback((len) => {
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) string += '0123456789'
    if (characterAllowed) string += '~`!@#$%^&*()_-+=[]{}|;:",<.>/?\'\\'

    let randomString = "";

    for (let i = 0; i < len; i++) {
      const rndmText = Math.floor(Math.random() * string.length)
      randomString += string[rndmText]
    }
    return randomString;
  }, [length, numberAllowed, characterAllowed])

  useEffect(() => {
    setPassword(randomStringGenerator(length))
  }, [randomStringGenerator, length])


  const copyPassword = useCallback(() => {
    buttonRef.current?.select()
    setState(!state)
    window.navigator.clipboard.writeText(password)

    setTimeout(() => {
      setState(state)
    }, 2000);
  }, [password])

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center ">


      <div className="text-3xl w-1/2 h-1/3 bg-gray-600 rounded-lg overflow-hidden p-4 text-white">
        <h1 className="text-center ">Password Generator</h1>
        <div className="w-full h-1/2 flex items-center justify-center">

          <input type="text" className="p-3 rounded-l-lg w-full text-black" value={password} ref={buttonRef} />

          <button onClick={copyPassword} className={`bg-blue-600 p-3 rounded-r-lg ${state ? 'text-orange-400 border-2 border-white' : 'text-gray-800'}`} >Copy</button>
        </div>

        <div className="w-full h-1/2 flex items-center justify-between text-lg">
          <div className="w-52 flex gap-4 items-center justify-center">

            <input type="range" className="h-1/6 w-[10px]" value={value} onChange={setTheValue} min={8} max={20} /> <h3>Length({length})</h3>
          </div>
          <div className="w-52 h-full flex gap-4 items-center justify-center">

            <input type="checkbox" checked={numberAllowed} onChange={() => { setNumberAllowed(!numberAllowed) }} /> <h3>Numbers</h3>
          </div>
          <div className="w-52 flex gap-4 items-center justify-center">

            <input type="checkbox" checked={characterAllowed} onChange={() => { setcharacterAllowed(!characterAllowed) }} /> <h3>Characters</h3>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;
