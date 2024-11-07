import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RTE, Select, Button, Input } from "../index";
import appwriteService from "../../appwrite/database";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log(data)
    // since post already exists , so it's Edit Mode
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        // paila ko post lai delete garde
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost({
        slug: post.$id,
        content: data.content,
        title: data.title,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
        console.log(dbPost.$id);
      }
    } else {
      // New Post Creation Mode
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        console.log(file.bucketId)
        const img = new Image();
        img.src = appwriteService.getFilePreview(file.bucketId);

        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          userName: userData.name,
        });

        console.log(data);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }

   
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mt-5">
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className=""
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
            {errors.title?.message}
          </p>
        )}

        <Input
          label="Slug :"
          placeholder="Slug"
          className=""
          {...register("slug", { required: "Slug is required" })}
        />
        {errors.slug && (
          <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
            {errors.slug?.message}
          </p>
        )}

        <RTE
          label="Content :"
          defaultValue={getValues("content")}
          onChange={(content) => {
            setValue("content", content);
          }}
          {...register("content")}
          />
          {errors.content && (
            <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
              {errors.content?.message}
            </p>
          )}

      </div>
      <div className="w-full md:w-1/3 px-2 mt-5 md:mt-0">
        <Input
          label="Featured Image :"
          type="file"
          className=""
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && (
          <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
            {errors.image?.message}
          </p>
        )}

        <Input
          label="Category :"
          type="text"
          className=""
          placeholder="category"
          {...register("category", { required: "Category is required" })}
        />
        {errors.category && (
          <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
            {errors.category?.message}
          </p>
        )}

        {post && (
          <div className="w-full ">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className=""
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
