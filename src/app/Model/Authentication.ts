export interface IAuthLoginDto {
  username?: string;
  password?: string;
}

export interface IAuthResponse {
  accessToken: string;
  errorMessage: string;
  isAuthenticated: boolean;
}
