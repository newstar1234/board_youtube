import { IAuthModuleOptions } from "@nestjs/passport";

const passportJwtConfig: IAuthModuleOptions<any> = {
  defaultStrategy: 'jwt'
}

export default passportJwtConfig;