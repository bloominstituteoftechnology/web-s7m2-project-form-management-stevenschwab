import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

const initialFormValues = () => ({
  fname: "", 
  lname: "", 
  bio: ""
});

export default function App() {
  const [members, setMembers] = useState(teamMembers);
  const [editing, setEditing] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues());

  useEffect(() => {
    if (editing) {
      const { fname, lname, bio } = members.find(mem => mem.id == editing);
      setFormValues({ fname, lname, bio })
    } else {
      setFormValues(initialFormValues());
    }
  }, [editing])

  const onChange = evt => {
    const { id, value } = evt.target;
    setFormValues(prevValues => ({ ...prevValues, [id]: value }))
  }
  
  const edit = id => {
    setEditing(id);
  }

  const submitNewMember = () => {
    const { fname, lname, bio } = formValues;
    const newMember = { fname, lname, bio, id: getId() };
    setMembers([ ...members, newMember]);
  }

  const editExistingMember = () => {
    setMembers(prevMembers => prevMembers.map(mem => {
      if (mem.id == editing) {
        return { ...mem, ...formValues }
      }
      return mem;
    }))
  }

  const onSubmit = evt => {
    evt.preventDefault();
    if (editing) {
      editExistingMember();
    } else {
      submitNewMember();
    }
    setFormValues(initialFormValues());
    setEditing(null);
  }

  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
          <input onChange={onChange} value={formValues.fname} id="fname" type="text" placeholder="Type First Name"/>
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input onChange={onChange} value={formValues.lname} id="lname" type="text" placeholder="Type Last Name"/>
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea onChange={onChange} value={formValues.bio} id="bio" placeholder="Type Bio"/>
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
