export interface LogInReq {
  Email: string;
  Password: string;
}

export interface SignUpReq {
  FirstName: string;
  Email: string;
  Password: string;
}

export interface LogInRes {
  message: string;
  token: string;
  userId: string;
  planId: number;
  status: 'active' | 'cancelled' | 'expired';
}

export interface SignUpRes {
  message: string;
  token: string;
  userId: string;
}

export interface AuthError {
  headers: {
    normalizedNames: { [key: string]: string };
    lazyUpdate: null;
  };
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: {
    message: string;
  };
}

export interface AuthData {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  planId?: number | null;
  status?: 'active' | 'cancelled' | 'expired' | null;
}
