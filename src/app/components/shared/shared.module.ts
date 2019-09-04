import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatGridListModule } from '@angular/material';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { ParticlesComponent } from './particles/particles.component';

@NgModule({
  declarations: [ConfirmationDialogComponent, HeaderComponent, FooterComponent, ThemePickerComponent, ParticlesComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatGridListModule, TranslateModule],
  exports: [FooterComponent, HeaderComponent, ParticlesComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}
