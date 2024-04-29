class User {
  // User code here
  constructor(userName,password,age){
    this.userName=userName;
    this.password=password;
    this.age=age;
    this.loggedIn=false;
  }
  login(password){
    if(this.password===password){
      this.loggedIn=true;
    }else {
      throw new Error("Incorrect password");
    }
  }
  logout(){
    
      this.loggedIn=false;
    
    
  }
}

module.exports = User
