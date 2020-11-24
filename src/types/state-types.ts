export interface AuthState {
  user: {
    username: string;
    email: string;
  } | null;
  authError: {
    message: string;
    code: number;
  } | null;
}

export interface LevelState {
  level: any;
}

export interface RootState {
  auth: AuthState;
  level: LevelState;
}
