import { deleteCookie, getCookie as getCk, setCookie } from "cookies-next";
import { AxiosRequestConfig, type AxiosResponse } from "axios";

// TODO: Update the import path to the correct location of ResponseType and imageUploadType
// import { ResponseType, type imageUploadType } from "@/enum/master";

// Temporary type definitions until the correct import path is found
enum ResponseType {
  json = "json",
  arraybuffer = "arraybuffer",
  blob = "blob",
  text = "text",
}

type imageUploadType = string;

import type {
  AppCookie,
  initTokenResponse,
  LookupValue,
  UserCredential,
  ApiResponse,
  FileStream,
  Profile,
} from "../types/api.type";

import { Secure, Cryp } from "./secure";
import axiosFn from "./axiosFn";
import { RestError, AppError } from "./error";
import { Config } from "../config";

async function catchError<T, E extends new (err?: any) => Error>(
  promise: Promise<T>,
  errorToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      if (errorToCatch === undefined) {
        return [error];
      }
      if (errorToCatch.some((e) => error instanceof e)) {
        return [error];
      }

      throw error;
    });
}

type RestOption = {
  baseUrl?: string;
  responseType?: ResponseType;
};

class Rest {
  public static getCookie = () => {
    const ck = getCk(Config.COOKIE_NAME);
    if (ck) {
      const cryp = new Cryp({});
      return cryp.decrypt<AppCookie>(ck as string);
    }
    return null;
  };

  private static createHeaders = () => {
    const iv = Secure.createKeyId();
    const headers: Record<string, any> = {
      "data-code": iv,
    };
    const ck = this.getCookie();

    if (ck) {
      headers.Authorization = `Bearer ${ck.token}`;
    }
    const cryp = new Cryp({ iv, key: ck ? ck.dynamicKey : undefined });
    const form = new URLSearchParams();

    return {
      cryp,
      form,
      headers,
    };
  };

  public static async postWithResposeFile(
    url: string,
    param?: Record<string, any>,
    option: RestOption = { responseType: ResponseType.arraybuffer },
  ) {
    const iv = Secure.createKeyId();
    const headers: Record<string, any> = { "data-code": iv };
    const ck = this.getCookie();

    if (ck) {
      headers.Authorization = `Bearer ${ck.token}`;
    }
    const cryp = new Cryp({ iv, key: ck ? ck.dynamicKey : undefined });
    const form = new URLSearchParams();

    const { baseUrl, responseType } = option;

    const config: AxiosRequestConfig = { headers, responseType };
    if (baseUrl) config.baseURL = baseUrl;

    if (param) {
      form.append("param", encodeURI(cryp.encrypt(JSON.stringify(param))));
    }

    const res = await catchError(this.responseFile(axiosFn.post(url, form, config)), [RestError<FileStream>, AppError]);

    return res;
  }

  public static async post<T>(
    url: string,
    param?: Record<string, any>,
    option: RestOption = { responseType: ResponseType.json },
  ) {
    const { baseUrl, responseType } = option;
    const { form, cryp, headers } = this.createHeaders();

    const config: AxiosRequestConfig = { headers, responseType };
    if (baseUrl) config.baseURL = baseUrl;

    if (param) {
      form.append("param", encodeURI(cryp.encrypt(JSON.stringify(param))));
    }

    const res = await catchError(this.responseHandler<T>(axiosFn.post(url, form, config), cryp), [
      RestError<T>,
      AppError,
    ]);

    return res;
  }

  public static async put<T>(
    url: string,
    param?: Record<string, any>,
    option: RestOption = { responseType: ResponseType.json },
  ) {
    const { baseUrl, responseType } = option;
    const { form, cryp, headers } = this.createHeaders();

    const config: AxiosRequestConfig = { headers, responseType };
    if (baseUrl) config.baseURL = baseUrl;

    if (param) {
      form.append("param", encodeURI(cryp.encrypt(JSON.stringify(param))));
    }

    const res = await catchError(this.responseHandler<T>(axiosFn.put(url, form, config), cryp), [
      RestError<T>,
      AppError,
    ]);

    return res;
  }

  public static async patch<T>(
    url: string,
    param?: Record<string, any>,
    option: RestOption = { responseType: ResponseType.json },
  ) {
    const { baseUrl, responseType } = option;
    const { form, cryp, headers } = this.createHeaders();

    if (param) {
      form.append("param", encodeURI(cryp.encrypt(JSON.stringify(param))));
    }

    const config: AxiosRequestConfig = { headers, responseType };
    if (baseUrl) config.baseURL = baseUrl;

    const res = await catchError(this.responseHandler<T>(axiosFn.patch(url, form, config), cryp), [
      RestError<T>,
      AppError,
    ]);

    return res;
  }

  public static async get<T>(
    url: string,
    param?: Record<string, any>,
    option: RestOption = { responseType: ResponseType.json },
  ) {
    const { baseUrl, responseType } = option;
    const { form, cryp, headers } = this.createHeaders();

    if (param) {
      form.append("param", encodeURI(cryp.encrypt(JSON.stringify(param))));
    }

    const config: AxiosRequestConfig = { headers, responseType };
    if (baseUrl) config.baseURL = baseUrl;

    const axiosPath = url + (param ? `?${form.toString()}` : "");

    const res = await catchError(this.responseHandler<T>(axiosFn.get(axiosPath, config), cryp), [
      RestError<T>,
      AppError,
    ]);

    return res;
  }

  public static async lookup<T = LookupValue>(table: string, param?: Record<string, any>) {
    const res = await this.post<T[]>(`/lookup${table}`, param);
    return res;
  }

  private static async uploadFile<T = string>(
    url: string,
    file: File | File[],
    param?: Record<string, any>,
    paramKeys: string[] = ["file"],
  ) {
    const { cryp, headers } = this.createHeaders();
    const form = new FormData();
    if (file instanceof Array) {
      paramKeys.forEach((k, i) => {
        form.append(k, file[i]);
      });
    } else {
      form.append(paramKeys[0], file);
    }
    if (param) {
      form.append("param", encodeURI(cryp.encrypt(JSON.stringify(param))));
    }
    const res = await catchError(this.responseHandler<T>(axiosFn.post(url, form, { headers }), cryp), [
      RestError<T>,
      AppError,
    ]);

    return res;
  }

  public static upload = {
    image: (image: File, url = "/file/upload/image") => this.uploadFile(url, image),
    imageWithParam: (image: File, type: imageUploadType, url = "/file/upload/image") =>
      this.uploadFile(url, image, { type }),
    images: (image: File | File[], paramKeys: string[], url = "/file/upload/image", param?: Record<string, any>) =>
      this.uploadFile(url, image, param, paramKeys),
    file: (file: File, url = "/file/upload/file") => this.uploadFile(url, file),
  };

  private static async responseHandler<T>(func: Promise<AxiosResponse<any, any>>, cryp: Cryp) {
    try {
      const res = await func;

      let result: ApiResponse<T> | null;

      try {
        result = cryp.decrypt<ApiResponse<T>>(res.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error("error with decrypting data and start trying to decrypt with static IV =======>", error);

        const c = new Cryp({ iv: cryp.ivText });
        result = c.decrypt<ApiResponse<T>>(res.data);
      }

      if (!result) throw new AppError("Cannot Decrypt data");
      if (!("status" in result)) throw new AppError("Response not support");
      if (result.code === 401) {
        deleteCookie(Config.COOKIE_NAME);
        throw new AppError("Unauthorized");
      }
      if (result.status !== "ok" || result.code !== 200) {
        throw new RestError(result);
      }

      return result;
    } catch (error: any) {
      if (error.status === 401) {
        deleteCookie(Config.COOKIE_NAME);
        throw new AppError("Unauthorized");
      }
      throw new AppError(error.message ?? "Error");
    }
  }

  private static async responseFile(func: Promise<AxiosResponse<any, any>>) {
    try {
      const res = await func;

      const file: FileStream = {
        buffer: res.data,
        filename: "",
      };

      const disposition = res.headers?.["content-disposition"];
      if (disposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          file.filename = matches[1].replace(/['"]/g, "");
        }
      }

      return {
        status: res.status === 200 ? "ok" : "error",
        code: res.status,
        data: file,
      } as ApiResponse<FileStream>;
    } catch (e: any) {
      if (e.response) {
        if (e.response.status === 401) {
          // clear cookie and redirect to signin page
          deleteCookie(Config.COOKIE_NAME);
          throw Error("axios error - Unauthorized");
        } else {
          if (e.response.status !== 200) throw new AppError(e.response.status);
          throw e;
        }
      } else {
        throw e;
      }
    }
  }
}

class Auth {
  private static maxAge = 60 * 60 * 4;

  public static getCookie = () => {
    return Rest.getCookie();
  };

  public static async initToken() {
    const ckRest = Rest.getCookie();

    if (ckRest) return ckRest.auth;

    const cryp = new Cryp({});
    const keyId = Secure.createKeyId();
    const atext = Secure.createKey(keyId);
    const param = { platform: "web", atext };

    const [error, response] = await Rest.post<initTokenResponse>("/token", param);

    if (error) {
      throw error.message;
    }

    const dynamicKey = Secure.createDymanicKey(keyId, response.data.btext);
    const data: AppCookie = {
      keyId,
      dynamicKey,
      pk: response.data.btext || "",
      token: response.data.token || "",
      auth: false,
      role: "",
    };
    const ck = cryp.encrypt(JSON.stringify(data));

    setCookie(Config.COOKIE_NAME, ck, {
      maxAge: this.maxAge,
    });

    return data.auth;
  }

  public static async signin(email: string, password: string): Promise<[string] | [undefined, Profile]> {
    const cryp = new Cryp({});
    const ck = Rest.getCookie();

    if (!ck) return ["no cookie"];

    const keyId = Secure.createKeyId();
    const atext = Secure.createKey(keyId);
    const param = { email, password, atext };
      console.log("Signing in with params:", param);
    const [error, res] = await Rest.post<UserCredential>("/auth/signin", param);

    if (error) {
      return [error.message];
    }

    const dynamicKey = Secure.createDymanicKey(keyId, res.data.btext);
    const data: AppCookie = {
      keyId,
      dynamicKey,
      pk: res.data.btext || "",
      token: res.data.token || "",
      auth: true,
      role: res.data.profile.role_level,
    };
    const cookie = cryp.encrypt(JSON.stringify(data));

    setCookie(Config.COOKIE_NAME, cookie, {
      maxAge: this.maxAge,
    });

    return [undefined, res.data.profile];
  }

  public static async signout(fromApi = false) {
    if (fromApi) {
      const [error] = await Rest.get<any>("/auth/signout");

      if (error) {
        throw error.message;
      }
    }

    deleteCookie(Config.COOKIE_NAME);
  }

  public static async Profile() {
    const [error, res] = await Rest.get<Profile>("/profile");

    if (error) {
      throw error.message;
    }

    return res.data;
  }
}

export { Auth, Rest };
