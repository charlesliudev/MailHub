import React from 'react';
import NavigationBar from './components/navbar'
import UserTable from './components/usertable'
import axios from 'axios'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      email: '',
      id: 0,
      emailtosend: '',
      subject: '',
      emailcontent: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/data')
      .then((res) =>
        this.setState({
          users: res.data,
          name: '',
          email: '',
          id: 0,
          emailtosend: '',
          subject: '',
          emailcontent: ''
        }))
  }

  nameChange = event => {
    this.setState({
      name: event.target.value
    });
  }
  emailChange = event => {
    this.setState({
      email: event.target.value
    })
  }

  addressChange = event => {
    this.setState({
      emailtosend: event.target.value
    })
  }

  subjectChange = event => {
    this.setState({
      subject: event.target.value
    })
  }

  contentChange = event => {
    this.setState({
      emailcontent: event.target.value
    })
  }

  sendEmail(event) {
    event.preventDefault();
    if (this.state.emailtosend === "" || this.state.emailcontent === "") {
      alert("Please enter an email and a message.")
    } else {
      axios.post('http://localhost:5000/sendemail/' + this.state.emailtosend + "/" + this.state.subject + "/" + this.state.emailcontent)
        .then(() => {
          this.componentDidMount();
        })
      alert("email sent.")
    }
  }

  submit(event, id) {
    event.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Enter valid name and email.")
    } else if (id === 0) {
      axios.post('http://localhost:5000/data', { "name": this.state.name, "email": this.state.email })
        .then(() => {
          this.componentDidMount();
        })
    } else {
      axios.put('http://localhost:5000/data/' + id, { "name": this.state.name, "email": this.state.email })
        .then(() => {
          this.componentDidMount();
        })
    }
    this.setState({
      id: 0
    })
  }

  delete = (id) => {
    console.log(id)
    axios.delete('http://localhost:5000/data/' + id)
      .then(() => {
        this.componentDidMount();
      })
  }

  contact = (id) => {
    this.state.users.forEach(user => {
      if (user._ID === id) {
        console.log(user.email)
        this.setState({
          emailtosend: user.email
        })
      }
    })
  }

  getOne = (id) => {
    console.log(id)
    axios.get('http://localhost:5000/data/getone/' + id)
      .then((res) => {
        console.log(res.data)
        this.setState({
          name: res.data.name,
          email: res.data.email,
          id: res.data._ID
        })
      })
  }


  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <div className="row">
            <div className="col lg-6">

              {/* ADD / EDIT USER */}
              <form className="user-control" onSubmit={(e) => { this.submit(e, this.state.id) }} style={{ marginTop: '30px' }}>
                <div className="form-group">
                  <label htmlFor="name" style={{ fontWeight: "bold" }}>Add / Edit User</label>
                  <input type="text" onChange={(e) => { this.nameChange(e) }} className="form-control" id="name" placeholder="Enter name" value={this.state.name}></input>
                </div>
                <div className="form-group">
                  <input type="email" onChange={(e) => { this.emailChange(e) }} className="form-control" id="email" placeholder="Email" value={this.state.email}></input>
                </div>
                <button type="submit" className="btn btn-block" style={{ backgroundColor: "#00baff", color: "white" }}>Submit</button>
              </form>


              {/* SEND EMAIL */}
              <form>
                <div className="form-group" onSubmit={(e) => { this.sendEmail(e) }} style={{ marginTop: '25px' }}>
                  <label htmlFor="email-address" style={{ fontWeight: "bold" }}>Send an Email:</label>
                  <input type="email" onChange={(e) => { this.addressChange(e) }} className="form-control" id="email-address" placeholder="name@example.com" value={this.state.emailtosend}></input>
                </div>
                <div className="form-group">
                  <input type="text" onChange={(e) => { this.subjectChange(e) }} className="form-control" id="subject-line" placeholder="Subject Line" value={this.state.subject} ></input>
                </div>
                <div className="form-group">
                  <textarea className="form-control" onChange={(e) => { this.contentChange(e) }} id="textarea" placeholder="Type here..." rows="5" value={this.state.emailcontent} ></textarea>
                </div>
                <button onClick={(e) => { this.sendEmail(e) }} type="submit" className="btn btn-block" style={{ backgroundColor: "#00baff", color: "white" }}>Submit</button>
              </form>


              {/* TABLE OF USERS */}
            </div>
            <div className="col lg-6">
              <UserTable users={this.state.users} deleteUser={this.delete} editUser={this.getOne} contactUser={this.contact} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
