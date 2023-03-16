const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoContract", function () {
  let contract;
  let todoContract;
  let owner;

  beforeEach(async function () {
    const TodoContract = await ethers.getContractFactory("TodoContract");
    [owner] = await ethers.getSigners();
    contract = await TodoContract.deploy();
  });
  

  describe("createTask", function () {
    it("should emit TaskAdded event", async function () {
      const taskText = "My new task";
      const tx = await contract.createTask(taskText);
      const receipt = await tx.wait();
      const event = receipt.events.find(
        (e) => e.event === "TaskAdded"
      );
      expect(event.args.recipient).to.equal(owner.address);
      expect(event.args.taskId).to.equal(0);
    });
  });


  describe("getUserTasks", function () {
    it("should return an empty array for new user", async function () {
      const tasks = await contract.getUserTasks();
      expect(tasks).to.have.lengthOf(0);
    });

    it("should return all user tasks", async function () {
      const taskTexts = ["My first task", "My second task", "My third task"];
      for (const taskText of taskTexts) {
        await contract.createTask(taskText);
      }
      const tasks = await contract.getUserTasks();
      expect(tasks).to.have.lengthOf(3);
      for (let i = 0; i < tasks.length; i++) {
        expect(tasks[i].taskText).to.equal(taskTexts[i]);
      }
    });

    it("should not return deleted tasks", async function () {
      const taskTexts = ["My first task", "My second task", "My third task"];
      for (const taskText of taskTexts) {
        await contract.createTask(taskText);
      }
      await contract.deleteTask(1, true);
      const tasks = await contract.getUserTasks();
      expect(tasks).to.have.lengthOf(2);
      expect(tasks[0].taskText).to.equal(taskTexts[0]);
      expect(tasks[1].taskText).to.equal(taskTexts[2]);
    });
  });

  describe("deleteTask", function () {
    it("should emit TaskDeleted event", async function () {
      await contract.createTask("My new task");
      const tx = await contract.deleteTask(0, true);
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "TaskDeleted");
      expect(event.args.taskId).to.equal(0);
      expect(event.args.isDeleted).to.equal(true);
    });
  });
});
