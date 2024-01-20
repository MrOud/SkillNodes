import { url } from "inspector";

export async function POST(request: Request) {
  const { search } = await request.json();
  console.log(search);

  return Response.json({
    data: [
      {
        id: 1,
        title: "Test Post",
        url: "https://www.google.com",
        body: "This is a test post",
      },
      {
        id: 2,
        title: "Test Post 2",
        url: "https://www.google.com",
        body: "This is a test post",
      },
      {
        id: 3,
        title: "Test Post 3",
        url: "https://www.google.com",
        body: "This is a test post",
      },
      {
        id: 4,
        title: "Test Post 4",
        url: "https://www.google.com",
        body: "This is a test post",
      },
    ],
  });
}
