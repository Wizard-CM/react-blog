import React, { lazy } from "react";

// const {Editor} = lazy(() => import("@tinymce/tinymce-react"))
import { Editor } from "@tinymce/tinymce-react";

function RTE({ label, name, defaultValue = "", onChange }, ref) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Editor
        apiKey="lj51pkv7k5tp7cwvyjj93bdgxynn98lcduyyv4r9bd2ldnpy"
        onEditorChange={(content) => {
          onChange(content);
        }}
        initialValue={defaultValue}
        ref={ref}
        name={name}
        init={{
          initialValue: defaultValue,
          height: 500,
          menubar: true,
          plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
          ],
          toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}

export default React.forwardRef(RTE);
