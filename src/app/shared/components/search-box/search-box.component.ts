import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>()

  @Output()
  public onDebounce = new EventEmitter<string>()


  @ViewChild('txtTermInput')
  public txtTermInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit( value )
    })
  }

  emitValue( value: string ): void {
    this.onValue.emit( value );
    this.txtTermInput.nativeElement.value = '';
  }

  onKeyPress( term: string): void {
    this.debouncer.next( term );
  }
}
