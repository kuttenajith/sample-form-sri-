import React from "react"; 

class FetchRandomUser extends React.Component{

  state={
    name: undefined,
    loading:true,
    person:null,
    items: null,
    error: undefined
  }

//    async componentDidMount(){
//   const url='https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000';
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);
//   this.setState({ person: data.items[0],loading:false,  error: "" });  
//  }

handleSubmit = (event) => {
  event.preventDefault();
  //const api_key = 'dc6zaTOxFJmzC';
  const url = 'https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000';
  fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ person: data.items[0],loading:false,  error: "" }))
    .catch(e => console.log('error', e));
}
render(){
  // const arr = this.state.items.map((item, key) =>
  //       <li key={item.id}>{item.name}</li>
  //   );
   return (
    <div>
    <form onSubmit={this.handleSubmit}>
    <input value={this.state.term} onChange={this.onChange} />
    <button>Search!</button>
  </form>

  
   {this.state.loading  || !this.state.person ? 
   (<div>
   loading...
    </div>)
    : 
    (
    <div>
      <div>id:{this.state.person.id}</div>
      <div>{this.state.person.score}</div>
      <div>{this.state.person.login}</div>
      <div>{this.state.person.type}</div> 
      <div>{this.state.person.following_url}</div>   
      <div>{this.state.person.node_id}</div>
    </div>
   )}
   </div>);
   
}
}
export default FetchRandomUser;