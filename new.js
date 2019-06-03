// import React from "react"; 

 
// class MyComponent extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         error: null,
//         isLoaded: false,
//         items: []
//       };
//       this.handleClick = this.handleClick.bind(this);
//     }
  
//     componentDidMount() {
//       fetch("https://api.github.com/search/users?q=tom+repos:>42+followers:>1000")
//         .then(res => res.json())
//         .then(
//           (result) => {
//             this.setState({
//               isLoaded: true,
//               items: result.items
//             });
//           },
//           (error) => {
//             this.setState({
//               isLoaded: true,
//               error
//             });
//           }
//         )
//     }

//     handleClick = ()  =>{
// //         this.setState(  prevState => {
// //           return {
// // result: prevState.result.filter(items = items.name !== name)
// //           }
            
// //           });
// console.log('this is:', this);
//     };
  
//     render() {
//       const { error, isLoaded, items } = this.state;
//       if (error) {
//         return <div>Error: {error.message}</div>;
//       } else if (!isLoaded) {
//         return <div>Loading...</div>;
//       } else {
//         return (
//           <ul>
//             {items.map(item => (
//               <li key={item.name}>
//                <button onClick={this.handleClick(item.name)}> {item.login} </button><br></br>
//              {/* {item.id} */}
//               </li>
//             ))}
//           </ul>
//         );
//       }
//     }
//   }
//   export default MyComponent;

import React from 'react';
import Collapsible from './Collapsible';


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            contacts: [],
            search:'',
            results:''
        }
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentWillMount() {
        localStorage.getItem('contacts') && this.setState({
            //contacts: JSON.parse(localStorage.getItem('contacts')),
            isLoading: false
        })
    }
    
    componentDidMount(){

        const date = localStorage.getItem('contactsDate');
        const contactsDate = date && new Date(parseInt(date));
        const now = new Date();

        const dataAge = Math.round((now - contactsDate) / (1000 * 60)); // in minutes
        const tooOld = dataAge >= 1;

        if(tooOld){
            this.fetchData();            
        } else {
            console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
        }
    }

    fetchData(){

        this.setState({
            isLoading: true,
            contacts: []
        })

        fetch('https://randomuser.me/api/?results=50&nat=us,dk,fr,gb')
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.results.map(user => (
            {
                name: `${user.name.first} ${user.name.last}`,
                username: `${user.login.username}`,
                email: `${user.email} `,
                location: `${user.location.street}, ${user.location.city}`
            }
        )))
        .then(contacts => this.setState({
            contacts,
            isLoading: false
        }))
        .catch(error => console.log('parsing failed', error))
    }

  

    componentWillUpdate( nextState) {
        localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
        localStorage.setItem('contactsDate', Date.now());
    }

    updateSearch(event){
        this.setState({search:event.target.value.substr(0,10)});
    }

    render() {
        let {isLoading } = this.state;
        let contacts = this.state.contacts;
        let find = this.state.search.trim().toLowerCase();
        if (find.length > 0) {
            contacts = contacts.filter(function(user) {
              return user.username.toLowerCase().match(find);
            });
          }
      
        return (
            <div>
          {/* <button > search</button> */}
               <input 
               value = {this.state.search}
               onChange={this.updateSearch.bind(this)}
               placeholder="Search...."
               />
               <header>
                    <h1><button className="btn btn-sm btn-danger" onClick={(e) => {
                        this.fetchData();    
                    }}>Fetch data</button></h1>
                </header>
               <ul>
            {contacts.map(l => {
              return (
                <li>
                  {l.username} 
                </li>
              );
            })}
          </ul>
                
                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                    {
                            !isLoading && contacts.length > 0 ? contacts.map(contact => {
                                const {username, name, email, location} = contact;
                                return <Collapsible key={username} title={name}>
                                    <p>{email}<br />{location}</p>
                                </Collapsible>
                            }) : null
                        }
                    </div>
                    <div className="loader">
                        <div className="icon"></div>
                    </div>
                </div>
           
            </div>
        );
    }
}
export default App;
