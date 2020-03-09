import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
    private router: Router,private route: ActivatedRoute) { }
  menu 
  isOpen
  loaded = false
  items: Observable<any[]>;
  id
  chef
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.id =  params.id
      
        if( history.state.chef == undefined)
          {
            this.firestore.collection('chef').doc(this.id).valueChanges()
              .subscribe(i=> this.chef= i)
          }
          else{
            this.chef  = history.state.chef
          }
        
      this.items = this.firestore.collection('catogories',ref => ref.where('uid', '==',this.id)).valueChanges({ idField: 'id' });
      this.items.subscribe(i=> {
        this.menu = i
        this.loaded = true
      })
    })
  }
  loadItems(a:string) {
    this.router.navigate(['items/'+a], {relativeTo: this.route});
  }
  openGroup(a: number){
    this.isOpen=a;
  }
}
