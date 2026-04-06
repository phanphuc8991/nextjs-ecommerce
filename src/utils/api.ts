import queryString from "query-string";

type IRequest = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, any> | FormData | null;
  queryParams?: Record<string, any>;
  useCredentials?: boolean;
  headers?: Record<string, string>;
  nextOption?: RequestInit;
};

const isFormData = (val: any): val is FormData =>
  typeof FormData !== "undefined" && val instanceof FormData;

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  // Xử lý query params
  let finalUrl = url;
  if (Object.keys(queryParams).length > 0) {
    const query = queryString.stringify(queryParams, {
      skipNull: true,
      skipEmptyString: true,
    });
    finalUrl = `${url}?${query}`;
  }

  const isFD = isFormData(body);

  const options: RequestInit = {
    method,
    headers: {
      ...(isFD ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    ...nextOption, // nextOption override sau cùng
  };

  if (useCredentials) {
    options.credentials = "include";
  }

  // Body
  if (body && method !== "GET") {
    options.body = isFD ? body : JSON.stringify(body);
  }

  // Fetch với timeout (tùy chọn)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s
  options.signal = controller.signal;

  let res: Response;
  try {
    res = await fetch(finalUrl, options);
  } catch (error: any) {
    console.log("error", error);
    clearTimeout(timeout);
    if (error.name === "AbortError") {
      throw { statusCode: 0, error: "REQUEST_TIMEOUT" };
    }
    throw { statusCode: 0, error: "NETWORK_ERROR" };
  } finally {
    clearTimeout(timeout);
  }

  // Parse response an toàn
  let data: any = null;
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.warn("JSON parse error:", e);
      data = null;
    }
  } else if (contentType.includes("text/")) {
    data = await res.text();
  }

  // Handle error
  if (!res.ok) {
    const error = new Error(data?.error || data?.message || "UNKNOWN_ERROR");
    (error as any).statusCode = res.status;
    (error as any).raw = data;
    console.log('error',error);
    throw error;
  }

  return data as T;
};
