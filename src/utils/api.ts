import queryString from "query-string";

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

  if (Object.keys(queryParams).length) {
    url += `?${queryString.stringify(queryParams)}`;
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...nextOption,
  };

  if (useCredentials) {
    options.credentials = "include";
  }

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw {
      statusCode: res.status,
      error: data?.error ?? "UNKNOWN_ERROR",
    };
  }
  console.log('data',data);
  return data as T;
};
