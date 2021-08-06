import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [text, setText] = useState("")
  const [autoSaveConfirm, setConfirm] = useState(false);
  const [savedStatus, setSaved] = useState(false);

  // this useEffect will load the item saved earlier when the user hit save
  useEffect(() => {
    const currentSave = localStorage.getItem('user-text');
    if(currentSave) {
      setText(currentSave)
    }
  }, [])

  // will save if auto save is toggled
  useEffect(() => {
    const a = localStorage.getItem('autoSave')
    if(a) {
      setConfirm(JSON.parse(a))
    }
    if(autoSaveConfirm === true) {
        saveText();
    }
  }, [autoSaveConfirm, text])

  const on_change = (event) => {
    const new_val = event.target.value
    setText(new_val);
  }

  const clearText = () => {
    setText("")
  }

  // saves text currently in the textbox to localStorage
  const saveText = () => {
    localStorage.setItem('user-text', text)
    setSaved(true);
  }

  // this decides whether the user wants autosave or not
  // then stores the decision in localStorage
  const toggleAutoSave = () => {
    setConfirm(!autoSaveConfirm)
    localStorage.setItem('autoSave', JSON.stringify(autoSaveConfirm))
  }

  return (
    <div>
      <div className="App">
        <textarea value={text} onChange={on_change} className="txtbox"> </textarea>
      </div>
      <div className="btnSection">
        <button className="butt" onClick={clearText}>Clear Text</button>
        <button className="butt" onClick={saveText}>Save Text</button>
        <button className="butt" onClick={toggleAutoSave}>Auto-Save Text</button>
      </div>
    </div>
  );
}

export default App;
