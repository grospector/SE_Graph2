import {Component} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

/**
 * @title Bottom Sheet Overview
 */
@Component({
  selector: 'sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
})
export class SheetComponent {
  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(Opensheet);
  }
}

@Component({
  selector: 'opensheet',
  templateUrl: './opensheet.html',
})
export class Opensheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<Opensheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
