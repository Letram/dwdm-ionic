import { NgModule } from '@angular/core';
import { TitleFilterPipe } from './title-filter/title-filter';
import { NamePipe } from './name/name';
@NgModule({
	declarations: [TitleFilterPipe,
    NamePipe],
	imports: [],
	exports: [TitleFilterPipe,
    NamePipe]
})
export class PipesModule {}
