import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const SkillNodePostPage = () => {
  return (
    <div className="w-full md:w-[80%]  min-h-screen p-3 md:p-8 mx-auto flex flex-col pt-0 md:pt-14">
      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col gap-5 max-w-2xl">
          <Image
            src="https://picsum.photos/500"
            width={500}
            height={200}
            alt="Node Post Image"
            className="rounded-sm overflow-clip object-contain"
          />
          <h1 className="font-semibold text-xl md:text-2xl">
            File your taxes as college students
          </h1>
          <p className="text-balance">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ex
            numquam ab itaque. Odio nemo fugit recusandae animi incidunt numquam
            deleniti, quos dolore commodi excepturi officia, mollitia ratione.
            Nihil, temporibus?
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/2 overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col bg-white rounded-lg border-2 border-gray-100 p-3 md:p-4">
              <div className="flex items-center gap-5">
                <Image
                  src={"https://picsum.photos/50"}
                  width={50}
                  height={50}
                  alt="Noders Profile Picture"
                  className="rounded-full  max-w-sm bg-white overflow-clip object-contain"
                />
                <h1 className="font-normal ">Noders Name</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillNodePostPage;
