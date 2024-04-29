const User = require('../src/User')

const user = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  let userNameTest = 'Joe Bloggs';
  let passwordTest = 'test123'
  let ageTest = 21
  let user;
  beforeEach(() => {
    user = new User(userNameTest,passwordTest,ageTest)
    
  });
  test("User class should create a User instance", () => {
    
    expect(user).toBeInstanceOf(User);
  });
  test("Constructor should properly initialize properties", () => {

    
    
    expect(user.userName).toBe(userNameTest);
    expect(user.password).toBe(passwordTest);
    expect(user.age).toBe(ageTest);
   
  });
  test('Constructor properties have correct type', () => {
    
    expect(typeof user.userName).toBe('string')
    expect(typeof user.password).toBe('string')
    expect(typeof user.age).toBe('number')

  })
  //loggin method: set this.loggedIn to true if argument (password) is the same as this.password,otherwise, sets this.loggedIn to false
  test('Loging method set loggedIn to true when password is correct',()=>{
    
    user.login(passwordTest) //use the same password initially set in the constructor
    expect(()=>user.login(passwordTest)).not.toThrow()
    expect(user.loggedIn).toBe(true)

  })
  test('Loging method throws an error when password is incorrect',()=>{
    
    let wrongPassword = 'jp321eefefrfdv'
    expect(()=>user.login(wrongPassword)).toThrow('Incorrect password')

  })
  //logout method: sets this.loggedIn to false if loggedIn is true
  test('Logs an user out', ()=>{
    
    user.logout();
    expect(user.loggedIn).toBe(false)
  }) 

  
})



// test logout
