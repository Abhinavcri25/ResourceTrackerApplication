import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss'
})
export class MyComponentComponent {
    num : number =  0;
    func1 (){
      this.num++;
    }
    func2 (){
      this.num--;
    }
    func3 (){
      this.num -= 2;
    }
    func4 (){
      this.num += 2;
    }
    s = {
      name : "Abhinav",
      age : 23,
    }
}
