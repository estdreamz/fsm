import { ApiResponse } from "../types/api.type";

class AppError extends Error {
  name = "App Error";
}

class RestError<T> extends Error {
  name = "Rest Error";
  res: ApiResponse<T>;
  constructor(rs: ApiResponse<T>) {
    super(rs.message);
    this.res = rs;
  }
}

export { RestError, AppError };
