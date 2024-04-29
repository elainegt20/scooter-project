const Scooter = require("../src/Scooter");
const User = require("../src/User.js");

let stationTestA = "Station A";
let stationTestB = "Station B";
const userTest = new User("Juan Perez", "jp1234", 25);

// typeof scooter === object
describe("scooter object", () => {
  let scooter;
  beforeEach(() => {
    scooter = new Scooter(stationTestA);
    // Reset serial number before each test 
    Scooter.nextSerial = 1;
  });
  test("Scooter class should create Scooter instance", () => {
    
    expect(scooter).toBeInstanceOf(Scooter);
  });
  test("Constructor should properly initialize properties", () => {
    
    expect(scooter.station).toBe(stationTestA);
    expect(scooter.user).toBeNull();
    expect(scooter.serial).toBe(1);
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
    //expect(typeof scooter.station).toBe("string")
  });
  //test rent method: it set this.station to null and this.user to a User instance when this.charge is greater than 20 and thi.isBroken is false
  test("Scooter rents correctly when charged and not broken", () => {
    /*
   The use of an arrow function ensures that any exceptions thrown can be caught by the testing framework. 
   If you called scooter.rent(userTest) directly without wrapping it in a function, any thrown exceptions would occur 
   before expect could handle them, causing the test to fail incorrectly.
   */
    
    expect(() => scooter.rent(userTest)).not.toThrow();
    expect(scooter.station).toBeNull();
    expect(scooter.user).toBe(userTest);
  });
  test("Scooter rent throws error when charge is too low", () => {
    
    scooter.charge = 10; // set charge bellow 20
    expect(() => scooter.rent(userTest)).toThrow("Scooter needs to charge");
  });
  test("Scooter rent throws error when scooter needs repair", () => {
    
    scooter.isBroken = true;
    expect(() => scooter.rent(userTest)).toThrow("Scooter needs repair");
  });
  //test dock method: Returns the scooter to the station. Clear out the user
  test("Scooter gets back to station correctly", () => {
    
    scooter.rent(stationTestA);
    scooter.dock(stationTestB); //dock to another station
    expect(scooter.station).toBe(stationTestB);
    expect(scooter.user).toBeNull();
  });
  test("serial number properly increments", () => {
    const scooter = new Scooter(stationTestA);
    const scooter2 = new Scooter(stationTestB);
    expect(scooter2.serial).toBe(2);
  });
});

describe("test asyn methods", () => {
  jest.useFakeTimers(); // Use fake timers to control setInterval
  let scooter;
  let consoleSpy;
  beforeEach(() => {
    // Spy on console.log
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    scooter = new Scooter();
  });

  afterEach(() => {
    // Restore the spy

    consoleSpy.mockRestore();
    //clear time
    jest.clearAllTimers();
  });

  //test recharge method
  test("Should adds 10 to charge every second if charge is bellow 100 and logs current charge to the console", () => {
    scooter.charge = 20; //set charge bellow 100
    scooter.recharge(); //call recharge method
    jest.advanceTimersByTime(1000);
    expect(scooter.charge).toBe(30);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Current charge: ${scooter.charge}%`
    );

    jest.advanceTimersByTime(3000); // Total 4 seconds from the start
    expect(scooter.charge).toBe(60);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Current charge: ${scooter.charge}%`
    );

    //if charge is equal 100 it does not add more
    scooter.charge = 100;
    scooter.recharge();
    expect(scooter.charge).toBe(100); //charge stays as it was
  });
  //test repair method
  test("Should set isBroken property and logs a message to the console when certain time is reached", () => {
    scooter.isBroken = true;
    scooter.requestRepair();
    jest.advanceTimersByTime(5000);
    expect(scooter.isBroken).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith("Repair completed");
  });
});
