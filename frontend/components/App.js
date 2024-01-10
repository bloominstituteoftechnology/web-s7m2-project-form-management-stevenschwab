/**
 * step 1: import react and hooks
 * `useState` is used to declare state variables in functional components
 * `useEffect` is used to perform side effects in functional components
 */
import React, { useState, useEffect } from 'react'

/**
 * step 2: initialize static data and helper functions
 * initialize a variable `id` used to track unique IDs for new team members
 * `getId` is a helper function incrementing `id` and is invoked every time a new member object is created
 * `teamMembers` is an array holding initial data for team members
 * `initialFormValues` is a helper function creating an empty member object and is invoked every time the form needs to reset values
 */
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

/**
 * step 3: define the functional component
 * definition of the `App` functional component which holds all the logic and JSX for the component
 */

export default function App() {
  /**
   * step 4: declare state variables
   * three state variables are declared
   * `members` to store the array of team member objects
   * `editing` to keep track of the member currently being edited (if any)
   * `formValues` to store the current values of the form inputs
   */
  const [members, setMembers] = useState(teamMembers);
  const [editing, setEditing] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues());

  /**
   * step 5: use the `useEffect` hook for side effects
   * used here to synchronize the form values with the member that's being edited
   * when editing changes, the effect updates the `formValues` state with the details of the member being edited
   */
  useEffect(() => {
    if (editing) {
      const { fname, lname, bio } = members.find(mem => mem.id == editing);
      setFormValues({ fname, lname, bio })
    } else {
      setFormValues(initialFormValues());
    }
  }, [editing])

  /**
   * step 6: event handlers and helper function definitions
   * `onChange` handles changes to form fields
   * `edit` sets a member to be edited
   * `submitNewMember` adds a new member to the state array
   * `editExistingMember` updates an existing member's details
   * `onSubmit` handles the form submission
   */
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

  /**
   * step 7: render the component's JSX
   * the `return` statement contains the JSX that describes the component's UI
   * it includes a list of team members, with each member having an 'edit' button
   * a form for editing an existing member or adding a new one, with the form fields bound to the `formValues` state and `onChange` handler
   * the form's submit event is bound to the `onSubmit` handler
   */

  return (
    <div>
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
