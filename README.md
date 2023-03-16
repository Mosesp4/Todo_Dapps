###Blockchain Task Management Dapp
##This is a decentralized application (Dapp) built on the Ethereum blockchain for managing tasks. It allows users to create tasks, mark them as completed, and delete them. The Dapp is built using the Solidity programming language and the Truffle framework.

##Features
### 1. Creating tasks: Users can create tasks by entering the task description.
### 2. Deleting tasks: Users can delete a task once it is no longer needed.

###Requirements
### 1. Node.js and NPM
### 2. Hardhat
### 3. MetaMask or any other Ethereum wallet

##Setup
Clone the repository and navigate to the project directory.
Install the dependencies by running npm install.
Run your Ethereum client (Ganache) and create a new workspace.
Compile and migrate the smart contract to the blockchain by running truffle migrate.
Start the development server by running npm run dev.
Connect your Ethereum wallet (MetaMask) to the Dapp and switch to the local network.
Create some tasks and start managing them!
Usage
To create a new task, enter the task description in the input field and click on the "Add Task" button.
To mark a task as completed, click on the checkbox next to the task description.
To delete a task, click on the "x" button next to the task description.
To filter tasks, click on the "Filter Tasks" dropdown and select either "All Tasks", "Completed Tasks", or "Incomplete Tasks".
Development
The smart contract code is located in the contracts directory. The frontend code is located in the src directory. The truffle-config.js file contains the configuration for the Truffle framework.

To run tests, use the truffle test command.

Deployment
To deploy the Dapp to the Ethereum mainnet or testnet, update the truffle-config.js file with the correct network configuration and run the truffle migrate command.

License
This Dapp is licensed under the MIT License.
