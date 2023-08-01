interface IDbConfig {
 readonly dbUri: string
 readonly dbName: string
}

export interface IConfig {
  readonly NODE_ENV: string
  readonly database: IDbConfig
}
