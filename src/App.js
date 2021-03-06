import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Todo from './components/Todo';
import Header from './components/layout/header'
import AddTodo from './components/AddTodo'
// import uuid from 'uuid';
import About from "./components/pages/About";
import axios from "axios";



class App extends Component {
    state = {
        todos: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=100')
            .then(res=>this.setState({todos:res.data}))
    }

//toggle Complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        })
    }

    // // deleteTodo
    // delTodo = (id) => {
    //     this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]})
    // }
    // deleteTodo
    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res=>this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}))

    }

    // //Add todo
    // addTodo = (title) => {
    //     const newTodo = {
    //         id: uuid.v4(),
    //         title,
    //         completed: false
    //     }
    //     this.setState({todos: [...this.state.todos, newTodo]})
    // }
    //Add todo
    addTodo=(title)=>{
        axios.post('https://jsonplaceholder.typicode.com/todos?_limit=100',{
            title,
            completed:false
        })
    .then(res=>this.setState({todos: [...this.state.todos, res.data]}))

    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header/>
                        <Route exact path="/" render={props=>(
                           <React.Fragment>
                               <AddTodo addTodo={this.addTodo}/>
                        <Todo todos={this.state.todos} markComplete={this.markComplete}
                              delTodo={this.delTodo}/>
                           </React.Fragment>
                        )}/>
                        <Route path="/about" component={About}/>

                    </div>
                </div>
            </Router>
        );
    }

}

export default App;
