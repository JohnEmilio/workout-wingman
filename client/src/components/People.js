import { useState, useEffect } from "react"
import './people.css';
import { nanoid } from "nanoid"

function People() {
  const [people, setPeople] = useState([])
  const [note, setNote] = useState({ id: nanoid(), body: "Start typing here" })
  const [selectedTab, setSelectedTab] = useState("write")

  function updateText(text) {
    console.log(text.target.value, note)
    setNote(oldNote => ({ ...oldNote, body: text }))
  }

  return (
    <div className="textCard">
      <h1>type your text here</h1>
      <textarea className="noteArea" value={note.body} onChange={(e) => updateText(e)}></textarea>
    </div>
  );
}

export default People;
