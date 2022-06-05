export default function fetcher(target: string, data = undefined) {
  return fetch(`${window.location.origin}/api/${target}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
