import { Config } from "../config";
import axios from "axios";

function restInner() {
  const rest = axios.create();

  rest.defaults.baseURL = Config.API_URL;
  rest.defaults.headers.common = {
    Accept: "*/*",
    Lang: "TH",
  };
  rest.defaults.timeout = 5000;
  rest.defaults.headers.post = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return rest;
}

const axiosFn = restInner();

export default axiosFn;
