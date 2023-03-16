// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./SafeMath.sol";

contract TodoContract {
    using SafeMath for uint256;

    // Events
event TaskAdded(address indexed recipient, uint indexed taskId);
event TaskDeleted(uint indexed taskId, bool isDeleted);

// Structs
struct Task {
    uint id;
    string taskText;
    bool isDeleted;
}

// Storage variables
Task[] private allTasks;

mapping(uint256 => address) taskToOwner;

/*
 * @dev Adds a new task to the allTasks array and assigns it to the calling user.
 * @param _taskText The text of the new task.
 * @return No return value.
 */
function createTask(string memory _taskText) external {
    uint taskId = allTasks.length;
    allTasks.push(Task(taskId, _taskText, false));
    taskToOwner[taskId] = msg.sender;
    emit TaskAdded(msg.sender, taskId);
}

/**
 * @dev Returns an array of tasks that belong to the calling user and have not been deleted.
 * @return An array of Task structs that belong to the calling user and have not been deleted.
 */
function getUserTasks() external view returns (Task[] memory) {
    Task[] memory userTasks = new Task[](allTasks.length);
    uint taskCount = 0;
    for (uint i = 0; i < allTasks.length; i++) {
        if (taskToOwner[i] == msg.sender && !allTasks[i].isDeleted) {
            userTasks[taskCount] = allTasks[i];
            taskCount++;
        }
    }

    Task[] memory result = new Task[](taskCount);
    for (uint i = 0; i < taskCount; i++) {
        result[i] = userTasks[i];
    }
    return result;
}

/*
 * @dev Deletes an existing task owned by the calling user.
 * @param _taskId The ID of the task to be deleted.
 * @param _isDeleted The deletion status of the task.
 * @return No return value.
 */
function deleteTask(uint _taskId, bool _isDeleted) external {
    require(taskToOwner[_taskId] == msg.sender, "You do not own this task");
    allTasks[_taskId].isDeleted = _isDeleted;
    emit TaskDeleted(_taskId, _isDeleted);
}

}
