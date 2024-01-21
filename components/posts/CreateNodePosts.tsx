"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEDitor } from "tinymce";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import ApiUrl from "@/lib/url";
import { redirect } from "next/navigation";

export default function AddNodePost() {
  const [nodeTitle, setNodeTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const editorRef = useRef<TinyMCEEDitor | null>(null);

  const makeRequest = async () => {
    //   check if all fields are filled
    if (nodeTitle == "" || desc == "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill all the fields!",
        variant: "destructive",
      });
      return;
    }
    //   check if editor is empty
    if (editorRef.current?.getContent() == "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill all the fields!",
        variant: "destructive",
      });
      return;
    }
    //  Check if thumbnail is empty
    if (thumbnail == "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please upload a thumbnail!",
        variant: "destructive",
      });
      return;
    }

    try {
      let response = await fetch(ApiUrl("posts/create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: nodeTitle,
          desc: desc,
          link: thumbnail,
          content: editorRef.current?.getContent(),
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
      toast({
        title: "Success!",
        description: "Your node post has been created!",
      });
      redirect(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex p-4">
      <div className="w-1/2 p-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">upload a thumbnail</Label>
          {thumbnail != "" ? (
            <Image
              src={thumbnail}
              width={500}
              height={400}
              alt="skill node thumbnail"
              className="max-w-3xl"
            />
          ) : null}
          <UploadDropzone
            endpoint="imageUploader"
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
            onClientUploadComplete={(res) => {
              // Do something with the response
              setThumbnail(res[0].url);
            }}
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-10 p-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">skill node title</Label>
          <Input
            value={nodeTitle}
            onChange={(e) => {
              setNodeTitle(e.target.value);
            }}
            type="text"
            id="title"
            className="text-lg"
            placeholder="your skill node's title"
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">short description</Label>
          <Textarea
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            className="text-lg"
            placeholder="simple, sweet n concised description"
            id="description"
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">share your thoughts...</Label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="ecttc9op3edbdt9kqddp4e4rfd7j5rxnxowdfi8nvderzimg"
            init={{
              branding: false,
              plugins:
                "tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              height: 500,
            }}
          />
        </div>
        <Button onClick={() => makeRequest()} className="py-6">
          Submit
        </Button>
      </div>
    </div>
  );
}
