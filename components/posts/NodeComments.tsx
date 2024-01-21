"use client";
import { Button } from "../ui/button";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { Editor as TinyMCEEDitor } from "tinymce";
import parse from "html-react-parser";
import { toast } from "../ui/use-toast";
import ApiUrl from "@/lib/url";
// get user session in client side
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NodeComments = ({ slug }: { slug: string }) => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // fetch request to get all comments
    const getComments = async () => {
      console.log("in get comments");

      try {
        const response = await fetch(ApiUrl("comments/view/"), {
          next: {
            revalidate: 60,
          },
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug: slug,
          }),
        });

        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    };

    getComments();
  }, [slug]);
  return (
    <div className="flex flex-col gap-5">
      {status == "authenticated" ? (
        <MakeComment slug={slug} />
      ) : (
        <div className="bg-white rouded-lg p-6">
          <p className="text-center">Please sign in to post a comment</p>
        </div>
      )}

      <div className="flex flex-col gap-5 mt-5 overflow-y-scroll scrollbar-hide">
        {comments.length == 0 ? (
          <h1>No Comments yet, be the first one to do so</h1>
        ) : (
          comments.map((comment, i) => {
            return <IndvComment key={i} comment={comment} />;
          })
        )}
      </div>
    </div>
  );
};

export default NodeComments;

const IndvComment = ({ comment }: { comment: any }) => {
  console.log(comment);

  return (
    <div className="flex flex-col bg-white rounded-lg border-2 border-gray-100 p-3 md:p-4">
      <div className="flex items-center gap-5">
        <Image
          src={comment.image}
          width={30}
          height={30}
          alt="Noders Profile Picture"
          className="rounded-full  max-w-sm bg-white overflow-clip object-contain"
        />
        <h1 className="font-normal ">{comment.posterName}</h1>
      </div>
      <div className="">{parse(comment.bodyContent)}</div>
    </div>
  );
};

const MakeComment = ({ slug }: { slug: string }) => {
  const editorRef = useRef<TinyMCEEDitor | null>(null);
  const router = useRouter();

  const postComment = async () => {
    const content = editorRef.current?.getContent();
    if (content == "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Your comment is empty!",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await fetch(ApiUrl("comments/post"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bodyContent: content,
          madeOn: slug,
        }),
      });

      let data = await response.json();

      // check if there is an error
      if (data.error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: data.error,
          variant: "destructive",
        });
        return;
      }
      window.location.reload();
      toast({
        title: "Success!",
        description: "Your comment has been posted!",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rouded-lg p-6">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="ecttc9op3edbdt9kqddp4e4rfd7j5rxnxowdfi8nvderzimg"
        init={{
          height: 200,
          branding: false,
          plugins: "",
          menubar: false,
          statusbar: false,
          toolbar:
            "undo redo | bold italic underline strikethrough | link | bullist numlist",
        }}
      />
      <div className="flex justify-end mt-5">
        <Button
          variant={"default"}
          onClick={postComment}
          className="py-5 w-auto border-2"
        >
          Post your comment
        </Button>
      </div>
    </div>
  );
};
