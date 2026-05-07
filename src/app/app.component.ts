import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  name = 'RIN💖';

  photos = [
    'assets/photos/photo1.jpg',
    'assets/photos/photo2.jpg',
    'assets/photos/photo3.jpg',
    'assets/photos/photo4.jpg',
     'assets/photos/photo5.jpg',
    'assets/photos/photo6.jpg',
    'assets/photos/photo7.jpg',
    'assets/photos/photo8.jpg'
  ];

  currentIndex = 0;

  showWish = false;
  isPlaying = false;

  /* NEW */
  showEnvelope = true;
  opened = false;

  confettiItems: any[] = [];
  balloons: any[] = [];

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  ngOnInit() {
    /* WAIT FOR ENVELOPE CLICK */
  }

  /* START EXPERIENCE */

  startExperience() {

    this.showEnvelope = false;

    setTimeout(() => {

      this.opened = true;

      this.startSlider();
      this.startConfetti();
      this.startBalloons();

      const audio = this.audio.nativeElement;

      this.fadeInMusic(audio);

    }, 1000);
  }

  /* MUSIC FADE IN */

  fadeInMusic(audio: HTMLAudioElement) {

    audio.volume = 0;

    audio.play()
      .then(() => {

        this.isPlaying = true;

        let volume = 0;

        const fade = setInterval(() => {

          if (volume < 0.7) {

            volume += 0.05;

            audio.volume = volume;

          } else {

            clearInterval(fade);

          }

        }, 200);

      })
      .catch(err => {
        console.log('Autoplay blocked:', err);
      });
  }

  /* SLIDER */

  startSlider() {

    setInterval(() => {

      this.currentIndex =
        (this.currentIndex + 1) % this.photos.length;

    }, 3500);
  }

  /* TOGGLE MUSIC */

  toggleMusic() {

    const audio = this.audio.nativeElement;

    if (this.isPlaying) {

      audio.pause();

    } else {

      audio.play();

    }

    this.isPlaying = !this.isPlaying;
  }

  /* WISH */

  toggleWish() {

    this.showWish = !this.showWish;
  }

  /* CONFETTI */

  startConfetti() {

    setInterval(() => {

      this.confettiItems.push({
        left: Math.random() * 100,
        color: this.randomColor(),
        shape: this.randomShape()
      });

      if (this.confettiItems.length > 250) {
        this.confettiItems.shift();
      }

    }, 120);
  }

  /* BALLOONS */

  startBalloons() {

    setInterval(() => {

      this.balloons.push({
        left: Math.random() * 100,
        color: this.randomColor()
      });

      if (this.balloons.length > 25) {
        this.balloons.shift();
      }

    }, 900);
  }

  /* RANDOM COLORS */

  randomColor() {

    const colors = [
      '#a855f7',
      '#ec4899',
      '#60a5fa',
      '#34d399',
      '#facc15',
      '#ffffff'
    ];

    return colors[
      Math.floor(Math.random() * colors.length)
    ];
  }

  /* RANDOM SHAPES */

  randomShape() {

    const shapes = [
      'circle',
      'square',
      'triangle'
    ];

    return shapes[
      Math.floor(Math.random() * shapes.length)
    ];
  }
}