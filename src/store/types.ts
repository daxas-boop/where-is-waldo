export interface AuthState {
  user: any;
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
