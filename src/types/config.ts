type TErrorFormat = {
  readonly code: number
  readonly message: string
  readonly status: number
}

interface IDbConfig {
 readonly dbUri: string
 readonly dbName: string
}

interface IErrors {
  readonly userExistsError: TErrorFormat
  readonly userNotFoundError: TErrorFormat
  readonly authError: TErrorFormat
}

interface IJwt {
 readonly secret: string,
 readonly accessTokenexpiry: string,
 readonly refreshTokenExpiry: string,
}

export interface IConfig {
  readonly NODE_ENV: string
  readonly database: IDbConfig
  readonly jwt: IJwt
  readonly errors: IErrors
}
