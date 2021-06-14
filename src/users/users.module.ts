import { Module } from '@nestjs/common';
import { AdministratorsModule } from './administrators/administrators.module';
import { ClientsModule } from './clients/clients.module';

@Module({
	imports: [AdministratorsModule, ClientsModule],
})
export class UsersModule {}
