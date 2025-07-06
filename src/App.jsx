import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (charAllowed) {
      str += "!@#$%&*_";
    }

    if (numberAllowed) {
      str += "0123456789";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen text-white text-center">
        <h2 className="font-serif text-4xl p-8">Password Generator</h2>
        <div className="flex flex-col justify-center items-center bg-slate-600 shadow-xl shadow-blue-400 rounded-3xl p-10 space-y-8">
          <div className="flex justify-center items-center">
            <input
              type="text"
              value={password}
              className="w-full text-orange-400 text-xl font-semibold bg-gray-200 rounded-r-none rounded-2xl px-4 py-2 outline-none"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-800 cursor-pointer hover:bg-blue-700 duration-200 p-2 rounded-l-none rounded-3xl"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>

          <div className="flex gap-4 font-mono tracking-wide text-orange-400 font-semibold text-lg">
            <div className="flex justify-center items-center space-x-2">
              <input
                type="range"
                min={8}
                max={99}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setlength(e.target.value)}
              />
              <label>Length:{length}</label>
            </div>

            <div className="space-x-1">
              <input
                type="checkbox"
                id="num"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="num">Numbers</label>
            </div>

            <div className="space-x-1">
              <input
                type="checkbox"
                id="char"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="char">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
