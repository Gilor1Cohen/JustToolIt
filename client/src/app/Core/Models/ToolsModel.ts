export interface ToolCategory {
  id: number;
  name: string;
  image_url: string;
}

export interface ToolDetails {
  id: number;
  name: string;
  description: string;
  category_id: number;
  endpoint: string;
}

export interface HttpErrorResponseDetails {
  headers: {
    normalizedNames: { [key: string]: any };
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
    [key: string]: any;
  };
}
