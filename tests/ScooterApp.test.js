const User = require("../src/User.js");
const ScooterApp = require("../src/ScooterApp.js");
const Scooter = require("../src/Scooter.js");

// ScooterApp tests here
let userName = "Juan Perez";
let password = "jp12345";
let age = 21;

// register user
describe("registerUser method tests", () => {
  const scooterApp = new ScooterApp();

  test("Should return instance of User", () => {
    const newUser = scooterApp.registerUser(userName, password, age); //create user
    expect(newUser).toBeInstanceOf(User);
  });
  test("Should throw error if user already registered", () => {
    expect(() => scooterApp.registerUser(userName, age, password)).toThrow(
      "Already registered"
    );
  });
  test("Should throw error if user age is bellow 18", () => {
    //add user under 18 years old using registerUser and expect error
    expect(() =>
      scooterApp.registerUser("Ana Maria Perez", "amp798869", 16)
    ).toThrow("Too young to register");
  });
});

// log in
describe("log in method test", () => {
  const scooterApp = new ScooterApp();
  let consoleSpy;
  beforeEach(() => {
    // Spy on console.log
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    // Restore the spy
    consoleSpy.mockRestore();
  });

  test("Should throw error if userName is incorrect", () => {
    scooterApp.registerUser(userName, password, age);
    expect(() => {
      scooterApp.loginUser("Juann Perez", password); // Call loginUser method with incorrect userName
    }).toThrow("Username is incorrect.");
  });
  test("Should log message to the console if password is correct", () => {
    scooterApp.loginUser("Juan Perez", "jp12345"); // Call loginUser method with correct user name and  password to get log message to the console
    expect(consoleSpy).toHaveBeenCalledWith(`${userName} has been logged in.`);
  });
  test("Should throw error if password is incorrect", () => {
    expect(() => scooterApp.loginUser("Juan Perez", "68565697")).toThrow(
      "Password is incorrect."
    ); // Call loginUser method with correct user name and  password to get log message to the console
  });
});

// log out
describe("log out method test", () => {
  const scooterApp = new ScooterApp();
  let consoleSpy;
  beforeEach(() => {
    // Spy on console.log
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    // Restore the spy

    consoleSpy.mockRestore();
  });

  test("should throw an error if user is not found", () => {
    expect(() => scooterApp.logoutUser("Jim Carrie")).toThrow(
      "throw no such user is logged in"
    ); //try to logout user that does not exist in registered users
  });

  test("should log a message to the console", () => {
    scooterApp.registerUser(userName, password, age); //register user
    scooterApp.loginUser(userName, password); //log user in
    scooterApp.logoutUser(userName); //call logout method to locate user and log them out
    expect(consoleSpy).toHaveBeenCalledWith(`${userName} is logged out`);
  });
});

// rent scooter
describe("rent scooter method test", () => {
  const scooterApp = new ScooterApp();
  let consoleSpy;
  beforeEach(() => {
    // Spy on console.log
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    // Restore the spy

    consoleSpy.mockRestore();
  });
  test("logs message to the console if scooter is sucessfully rented", () => {
    let myStation = "Station A";
    scooterApp.registerUser(userName, password, age); //create a user to rent the scooter
    let myUser = scooterApp.registeredUsers[userName];
    let scooter1 = scooterApp.createScooter(myStation); //create a scoter instance on a station I know exits
    let scooter2 = scooterApp.createScooter(myStation); //create another scooter to have a longer list
    scooterApp.rentScooter(scooter1, myUser); //call method to rent scooter
    expect(
      scooterApp.station[myStation].findIndex(
        (currentScooter) => currentScooter.serial === scooter1.serial
      )
    ).toBe(-1); //check if scooter is no longer at station list by looking for its serial number
    expect(consoleSpy).toHaveBeenCalledWith("Scooter is rented");
  });
  test("throws an error if scooter is already rented", () => {
    let myStation = "Station A";
    scooterApp.registerUser("Susan Smith", "susan1234", 25); //create a user to rent the scooter
    let myUser = scooterApp.registeredUsers["Susan Smith"];
    let scooter1 = scooterApp.createScooter(myStation); //create a scoter instance on a station I know exits
    scooterApp.rentScooter(scooter1, myUser); //rent scooter to set expectations
    let scooter2 = scooterApp.createScooter(myStation); //create another scooter to have a longer list

    expect(() => scooterApp.rentScooter(scooter1, myUser)).toThrow(
      "Scooter already rented"
    ); //expect scooter to be rented
  });
});

// dock scooter

describe("dock scooter method test", () => {
  let scooterApp; 
  let consoleSpy;
  beforeEach(() => {
    // Spy on console.log
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    scooterApp = new ScooterApp()
  });

  afterEach(() => {
    // Restore the spy

    consoleSpy.mockRestore();
  });
  test("Should throw an error if station does not exists", () => {
    const scooter = scooterApp.createScooter('Station A')
    expect(() => scooterApp.dockScooter(scooter,"Station D")).toThrow(
      "No such station"
    ); //call method on scooterApp to dock scooter at station that does not exists
  });
  test("Should throw an error if scooter is already at station", () => {
    const scooter = scooterApp.createScooter('Station A') //create scooter
    const myUser = scooterApp.registerUser(userName,password,age) //create user
    scooterApp.rentScooter(scooter,myUser) //call rent scooter method to set expectations
    scooterApp.dockScooter(scooter,'Station A') 
    expect(()=>scooterApp.dockScooter(scooter,'Station A')).toThrow('Scooter already at station') //try to dock scooter at the same station to get an error
  });
  test("Should dock an scooter to the station if station exists and scooter is not already there", () => {
    const scooter = scooterApp.createScooter('Station A'); //create a scooter
    scooterApp.dockScooter(scooter,'Station B')
    expect(scooterApp.station['Station B'].some(currentScooter=>currentScooter.serial===scooter.serial)).toBe(true);//check scooter by serial number to see if it at station
    
  });
});
