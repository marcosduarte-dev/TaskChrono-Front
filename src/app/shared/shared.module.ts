import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  imports: [SidebarModule, ButtonModule],
  declarations: [],
  exports: [SidebarModule, ButtonModule],
  providers: [
    //SERVICES
  ],
})
export class SharedModule {}
