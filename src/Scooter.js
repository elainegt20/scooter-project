class Scooter {

  static nextSerial = 1; //this property does not reset each time you create an intance

  constructor(station) {
    this.station = station;
    this.user = null; // Scooters are docked initially without a user.
    this.serial = Scooter.nextSerial;//Assign current serial
    Scooter.nextSerial+=1;  //increment for next usage.
    this.charge = 100;
    this.isBroken = false;
  }
  

  rent(user) {
    if (this.charge < 20) {
      throw new Error("Scooter needs to charge")
    }else if(this.isBroken){
      throw new Error("Scooter needs repair");
    }
    this.station = null;
    this.user = user;

  }

  dock(station) {
    this.station = station;
    this.user = null;
  }
  recharge() {
    setInterval(() => {
      if (this.charge<100) {
        this.charge += 10;
      }
      console.log(`Current charge: ${this.charge}%`);
    }, 1000);
  }
  requestRepair(){
    setTimeout(()=> {
      if(this.isBroken){
        this.isBroken=false;
        console.log('Repair completed')
      }

    },5000)
  }
  
}

const test= new Scooter('station a')
console.log(typeof test.station)

module.exports = Scooter;
