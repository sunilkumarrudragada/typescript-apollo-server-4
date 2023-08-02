export interface ISignUpArgs {
  username: string
  password: string
  email: string
}

export interface ISignInArgs {
  password: string
  email: string
}

export interface ITokenResp {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}
