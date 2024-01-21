const ApiUrl = (path: string) => {
  let url = process.env.NEXT_PUBLIC_API_URL;
  return url + path;
};

export default ApiUrl;
