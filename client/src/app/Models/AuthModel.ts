export interface LogInReq {
  Email: string;
  Password: string;
}

export interface SignUpReq {
  FirstName: string;
  Email: string;
  Password: string;
}

export interface AuthRes {
  message: string;
  userId: string;
  planId: number;
  status: 'active' | 'cancelled' | 'expired';
  end_date: Date | null;
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
  userId: string | null;
  isAuthenticated: boolean;
  planId: number | null;
  status: 'active' | 'cancelled' | 'expired' | null;
  end_date: Date | null;
}

export interface JwtPayload {
  Email: string;
  id: string;
  plan_id: number;
  plan_status: 'active' | 'cancelled' | 'expired' | null;
  end_date: string | null;
  iat: number;
  exp: number;
}
