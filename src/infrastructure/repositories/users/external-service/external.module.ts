import { Module, HttpModule } from '@nestjs/common';
import { ExternalService } from './external.service';
@Module({
  imports: [HttpModule],
  providers: [ExternalService],
  exports: [ExternalService],
})
export class ExternalModule {}
