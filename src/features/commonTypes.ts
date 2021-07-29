export interface ModelObj<T> {
  [key: string]: T;
}

export interface InitialState {
  status: "idle" | "loading" | "listening" | "failed";
  error?: string;
}
