import { AfterViewInit, Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'go-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewInit, OnInit {

  slideIndex = 0;
  fragments: any[] = ['fragment_1','fragment_2','fragment_3'];
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  scrollToCompany(section:any){
    if(section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest"});
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.activeRoute.fragment.subscribe((data) => {
      this.scrollToCompany(data);
    });
  }

  ngAfterViewInit(): void {
    this._showNextSlide()
  }

  _showNextSlide(): void {
    this.scrollToCompany(this.fragments[this.slideIndex]);
    this.slideIndex++;
    if (this.slideIndex > this.fragments.length) {this.slideIndex = 0}
     setTimeout(() => {
      this._showNextSlide();
     }, 4000);
  }

  _previous(): void{
      this.scrollToCompany(this.fragments[this.slideIndex--]);
  }

  _next(): void{
    if((this.slideIndex) < this.fragments.length){
      this.scrollToCompany(this.fragments[this.slideIndex++]);
    }
  }
}
