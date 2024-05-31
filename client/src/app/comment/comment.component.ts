import { Component , Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommentsService } from "../services/comment.service";
import { UsersService, UserData } from "../services/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  @Input() dataFromParent: string = '';

  comments: any[] = [];
  users: any [] = [];
  currentUser: UserData | null = null;
  dataToSend = {};

  content : string = '';

  constructor (
    private commentsService: CommentsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.loadData();

    let storedUser = localStorage.getItem('logn?user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.usersService.currentUser.next(this.currentUser);
    };

  }

  //GET VALUE
  contentEdit : string = '';
  onContentInputChange(event: any) {
    this.content = event.target.value;
  }

  onContenEdit(event: any) {
    this.contentEdit = event.target.value;
  }

  //FUNCTION

  isLoading = false;

  loadData(): void {
    this.isLoading = true; // Bắt đầu loading
    // this.commentsService.getCmtOnArt(this.dataFromParent);

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log('id', id)
        if (id) {
          return this.commentsService.getCmtOnArt(this.dataFromParent);
        } else {
          return of([]);
        }
      })
    ).subscribe(data => {
      this.comments = data;
    });

    console.log('xem',this.dataFromParent);

    this.usersService.getusers().subscribe(data => {
      this.users = data;
    });

    // this.commentsService.getcommentsOnArt().subscribe(data => {
    //   this.comments = data;
    //   this.isLoading = false;
    // });
  }

  deletecmt(id : string){
    this.isLoading = true;
    this.commentsService.Userdelete(id, id, this.dataFromParent).subscribe(() => {
      this.isLoading = false;
      this.loadData();
    });
  };

  add(){
    this.isLoading = true;
    this.dataToSend = {
      content: this.content,
      user: this.currentUser?._id
    };
    this.commentsService.addData(this.dataToSend, this.dataFromParent).subscribe(() => {
      this.isLoading = false;
      this.loadData();
      this.content = '';
    });
  }

  edit(id:string){
    this.isLoading = true;
    console.log('k', this.content)
    this.dataToSend = {
      content: this.contentEdit
    };
    this.commentsService.updatedata(id, this.dataToSend).subscribe(() => {
      this.isLoading = false;
      this.loadData();
    });
  }

  //HIDE AND SHOW EDIT
  editingIndex: number | null = null;
  hideContent: boolean = false;

  openEdit(i:number, cmt:string){
    this.editingIndex = i;
    this.contentEdit = cmt;
  }

  closeEdit(){
    this.editingIndex = null;
  }
}
