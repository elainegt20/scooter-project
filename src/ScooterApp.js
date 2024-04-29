// require the User and Scooter classes - see where they can be used in ScooterApp.js
const User = require("./User.js");
const Scooter = require("./Scooter.js");
class ScooterApp {
  constructor() {
    this.station = {
      "Station A": [],
      "Station B": [],
      "Station C": [],
    };
    this.registeredUsers = {}; //keys are user name
  }
  /*
  If the user is not already registered AND is 18 or older, then add them as a new registered user. 
  Log to the console that the user has been registered and return the user.
If the user cannot be registered, throw an error: already registered or too young to register.
  */
  registerUser(userName, password, age) {
    if (this.registeredUsers[userName]) {
      throw new Error("Already registered");
    } else if (age < 18) {
      throw new Error("Too young to register");
    }
    const newUser = new User(userName, password, age);
    this.registeredUsers[userName] = newUser;
    console.log(`User ${userName} have been sucessfully registered`);
    return newUser;
  }

  /*
  loginUser(username, password)

Locate the registered user by name and call its login method. Log to the console that the user has been logged in.
If the user cannot be located or if the password is incorrect, then throw an error: Username or password is incorrect.
  */
  loginUser(userName, password) {
    if (!this.registeredUsers[userName]) {
      throw new Error("Username is incorrect.");
    } else {
      try {
        this.registeredUsers[userName].login(password); //calls login method from user class which throws error if password is incorrect
        console.log(`${userName} has been logged in.`);
      } catch (error) {
        if (error.message === "Incorrect password") {
          throw new Error("Password is incorrect.")
        }
      }
    }
  }
  /*
 logoutUser(username)

Locate the registered user and call its logout method. Log user is logged out to the console.
If the user cannot be located, throw no such user is logged in error

 
 

 */
  logoutUser(userName) {
    if (!this.registeredUsers[userName]) {
      throw new Error("throw no such user is logged in");
    } else {
      this.registeredUsers[userName].logout(); //call the logout method from the User class 
      console.log(`${userName} is logged out`);
    }
  }

  /*
  createScooter(station)

This method is called by the Scooter company’s home office when new scooters are deployed.
Create a new scooter, add it to the station’s scooter list, and set its station property. Log created new scooter to the console. Return the scooter.
Throws no such station error if the station does not exist.
  
  
  */
  createScooter(station) {
    if (!this.station[station]) {
      throw new Error("No such station");
    } else {
      const scooter = new Scooter(station);
      this.station[station].push(scooter);
      console.log("Created new scooter");
      return scooter;
    }
  }
  /*
 dockScooter(scooter, station)

Add the scooter to the station’s scooter list, and dock it.
Log scooter is docked to the console.
Throws no such station error if the station does not exist.
Throws scooter already at station error if the scooter is already there.
 
 
 
 */
  dockScooter(scooter, station) {
    if (!this.station[station]) {
      throw new Error("No such station");
    }
    if (
      this.station[station].some(
        (currentScooter) => currentScooter.serial === scooter.serial
      )
    ) {
      throw new Error("Scooter already at station");
    }
    this.station[station].push(scooter);
    scooter.dock(station);
    console.log("Scooter is docked");
  }
  /*
   rentScooter(scooter, user)

Locate the given scooter at one of the stations, and remove it from that station. Rent it to the user. Log scooter is rented to the console.
If the scooter is already rented, throw the error scooter already rented.

  
  
  
  */
  rentScooter(scooter, user) {
    for (let station in this.station) {
      let index = this.station[station].findIndex(
        currentScooter => currentScooter.serial === scooter.serial
      );
      if (index !== -1) {
        // if (scooter.station === null) {
        //   throw new Error("Scooter already rented");
        // }
        scooter.rent(user); //calls rent method front scooter class to set constructor properties on scooter
        this.station[station].splice(index, 1); //deletes scooter from station list
        console.log(`Scooter is rented`);
        break;
      }else{
        throw new Error("Scooter already rented");
      }
    }
  }

  /*
  print()

You will use this handy method when testing your ScooterApp.
Log the list of registered users to the console.
Log the list of stations and how many scooters are at each station to the console.
Take a moment to format it nicely so you can read it.
  
  
  
  */
  print() {
    for (let user in this.registeredUsers) {
      console.log(`${user}`);
    }
    const stationsList = Object.keys(this.station);
    for (let i = 0; i < stationsList.length; i++) {
      let scooterCount = this.station[i].length;
      console.log(`${stationsList[i]}: ${scooterCount} scooters`);
    }
  }
}

module.exports = ScooterApp;
