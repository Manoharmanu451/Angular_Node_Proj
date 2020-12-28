import { Component } from '@angular/core';
import { freeApiService } from './services/freeapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _freeApiService:freeApiService){
  }

  // x = prompt('Enter the number of Slots');
  lstcars=[];
  originalListCars = []
  randomColors = ['Red',"White",'Black','Blue']
  colorSelected = "All"

  ngOnInit(){
    this._freeApiService.getCars()
      .subscribe(data=>{
        this.lstcars = data
        
      })
  }

  public generateSlot(){
    const color = this.randomColors[(this.lstcars.length)%4]
    const slotNumber = this.lstcars.length+1
    const regNumber = this.randString(2)+"-" + this.randNumber(100)+"-"+this.randString(2)+"-" + this.randNumber(10000)
    console.log(color , slotNumber , regNumber)

    this._freeApiService.saveCars({
      Color : color,
      SlotNo : slotNumber,
      RegNo : regNumber
    })
      .subscribe(data=>{
        this.lstcars.push(data)
        // this.lstcars.sort()
      })
  }
  
  public deleteCars(id){
    console.log(id)
    this._freeApiService.deleteCar(id)
    .subscribe(()=>{
      let newCars = this.lstcars.filter((car)=>{
        return  car._id!=id
      })
      this.lstcars = newCars
      // this.lstcars.sort()
    })
  }
  private  randString(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {

      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


  private randNumber(n){
     return Math.ceil(Math.random()*n);
 }
  public onColorSelected(e){
    console.log(e)
    if(e=="All"){
      this.lstcars = this.originalListCars
      return
    }  
    const filteredCars = this.originalListCars.filter((b)=>{
      return b.Color == e
    })
    this.lstcars = filteredCars
 }
 public applyFilter(event) {
  const filterValue = (event.target.value);
  let trimmedFilter = filterValue.trim().toLowerCase();
  if (trimmedFilter == ""){
    this.lstcars = this.originalListCars
    return
  }
  const filteredCars = this.originalListCars.filter((car)=>{
    return car.RegNo.toLowerCase().includes(trimmedFilter)
 })
  this.lstcars = filteredCars
  console.log(trimmedFilter)
}
}
