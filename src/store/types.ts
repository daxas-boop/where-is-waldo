export interface RootState {
  user: any;
  authError: {
    message: string;
    code: number;
  } | null;
}
