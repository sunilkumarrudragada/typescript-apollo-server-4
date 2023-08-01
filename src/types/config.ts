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
}

export interface IConfig {
  readonly NODE_ENV: string
  readonly database: IDbConfig
  readonly errors: IErrors
}
