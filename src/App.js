import React, {useState, useEffect} from 'react';
import {TextField, Button} from "@mui/material";
import Todo from './Todo';
import './App.css';
import {TodoContractAddress} from './config.js';
import TodoAbi from './utils/TodoContract.json';

const ethers = require("ethers");

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [currentAccount, setCurrentAccount] = useState('')
  const [correctNetwork, setCorrectNetwork] = useState(false);
  
  const connectWallet = async() =>  {
    try {
      const {ethereum} = window

      if(!ethereum) {
        console.log("Metemask is not connected")
        return;
      }

      let chainId = await ethereum.request({method: 'eth_chainId'})

      const goerliChainId = "0x5";

      if(chainId !== goerliChainId) {
        return;
      } else {
        setCorrectNetwork(true);
      }
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.log('Error connecting to metamask', error)
    }   
  }


  const getUserTasks = async() => {
    try{
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TodoContract = new ethers.Contract(
          TodoContractAddress,
          TodoAbi.abi,
          signer
        )

        let allTasks = await TodoContract.getUserTasks();
        setTodos(allTasks);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch(error){
      console.log(error);
    }
  }


  const createTask= async (e)=>{
    e.preventDefault();

    let todo = {
      'taskText': input,
      'isDeleted': false
    };

    console.log(todo)

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TodoContract = new ethers.Contract(
          TodoContractAddress,
          TodoAbi.abi,
          signer
        )

        TodoContract.createTask(todo.taskText)
        .then(response => {
          setTodos([...todos, todo]);
          console.log("Task Completed");
        })
        .catch(err => {
          console.log("Error occured while adding a new task");
        });
        ;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }

    setInput('')
  };
  
  const deleteTask = key => async() => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TodoContract = new ethers.Contract(
          TodoContractAddress,
          TodoAbi.abi,
          signer
        )

        let deleteTx = await TodoContract.deleteTask(key, true);
        let allTodos = await TodoContract.getUserTasks();
        setTodos(allTodos);
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch(error) {
      console.log(error);
    }

    setInput('');
  }

  useEffect(() => {
    connectWallet();
    getUserTasks();
  }, []);

  return (
    <div>
{currentAccount === '' ? (
  <button
  className= 'btn'
  onClick={connectWallet}
  >
  Connect Wallet
  </button>
  ) : correctNetwork ? (
    <div className="App">
      <h1> Task Management App</h1>
      <form>
         <TextField className="outlined-basic" label="Make Todo" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
         onChange={e=>setInput(e.target.value)} />
        <Button className = "addTask_btn" variant="contained" color="primary" onClick={createTask} style={{margin: "0rem"}} >Add Todo Task</Button>
      </form>
      <ul>
          {todos.map(item=> 
            <Todo 
              key={item.id} 
              taskText={item.taskText} 
              onClick={deleteTask(item.id)}
            />)
          }
      </ul>
    </div>
  ) : (
  <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>

  </div>
)}
</div>
  );

}

export default App;
