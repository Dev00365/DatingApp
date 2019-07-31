import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() photos: Photo[];
@Output() getMemberPhotoChange = new EventEmitter<string>();

 uploader: FileUploader;
 hasBaseDropZoneOver = false;
 hasAnotherDropZoneOver = false;
BaseUrl = environment.baseUrl;
currentPhoto: Photo;
  constructor(private authservic: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  this.initializeUploader();
  }


  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.BaseUrl + 'users/' + this.authservic.decodeToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
  this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

  this.uploader.onSuccessItem = (item, Response, status, header) => {
    const res: Photo = JSON.parse(Response);
    const photo = {
      id: res.id,
      url: res.url,
      dateAdded: res.dateAdded,
      description: res.description,
      isMain: res.isMain
    };
    this.photos.push(photo);
  };

}
SetMainPhoto(photo: Photo) {
  this.userService.setMainPhoto(this.authservic.decodeToken.nameid, photo.id)
  .subscribe(() => {
    this.currentPhoto = this.photos.filter(p => p.isMain === true)[0];
    this.currentPhoto.isMain = false;
    photo.isMain = true;
    this.authservic.changeMemberPhoto(photo.url);
    this.authservic.currentUser.photoUrl = photo.url;
    localStorage.setItem('user', JSON.stringify(this.authservic.currentUser));
    // this.getMemberPhotoChange.emit(photo.url);
   },
  error => {
    this.alertify.error(error);
  });
}

DeletePhoto(id: number) {
  this.alertify.confirm('Are you sure to delete this photo', () => {
    this.userService.DeletePhoto(this.authservic.decodeToken.nameid, id).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
      this.alertify.success('Photo has been deleted');
    }, error => {
      this.alertify.error('Failed to delete this photo');
    });
  });

}

}
