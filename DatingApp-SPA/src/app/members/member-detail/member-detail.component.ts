import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    });

     this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            }];

      this.galleryImages = this.getImages();
  }

getImages() {
  const imgUrl = [];
  for (let i = 0 ; i < this.user.photos.length; i++) {

    imgUrl.push({
      small: this.user.photos[i].url,
      medium: this.user.photos[i].url,
      big:  this.user.photos[i].url
    });
  }
return imgUrl;

}



  // loadUser() {
  // this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) =>
  // {
  //   this.user = user;
  // }, error => {
  //   this.alertify.error(error);
  // });
  // }


}
