import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Btn } from "./Btn";
import NotFound from "./NotFound";

const UploadArea = ({ children, setChildren }) => {
  const [images, setImages] = useState([]);

  const fetchImages = () => {
    if (window.localStorage.getItem("images")) {
      setImages(JSON.parse(window.localStorage.getItem("images")));
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onDragEnter = (e) => {
    document.getElementById("fileInput").classList.add("dragover");
  };
  const onDragLeave = (e) => {
    document.getElementById("fileInput").classList.remove("dragover");
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const formData = new FormData();
      formData.append(
        "image",
        reader.result.slice(file.type === "image/png" ? 22 : 23)
      );
      formData.append("name", file.name);
      formData.append("key", "0cee1de697c090857e32d089d3927560");

      const upload = axios
        .post("https://api.imgbb.com/1/upload", formData)
        .then((data) => {
          if (window.localStorage.getItem("images")) {
            const images = JSON.parse(window.localStorage.getItem("images"));
            window.localStorage.setItem(
              "images",
              JSON.stringify([
                ...images,
                {
                  name: file.name,
                  data: data.data.data.url,
                },
              ])
            );
          } else {
            window.localStorage.setItem(
              "images",
              JSON.stringify([
                {
                  name: file.name,
                  data: data.data.data.url,
                },
              ])
            );
          }

          fetchImages();
        });

      toast.promise(upload, {
        loading: "Uploading...",
        success: `Uploaded ${file.name}.png`,
        error: "Error Uploading File",
      });
    };
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      getBase64(file);
    } else {
      toast.error("File must be png or jpg");
    }
  };

  const addImage = (src) => {
    setChildren([
      ...children,
      {
        component: (
          <img src={src} style={{ height: "100%", width: "100%" }} alt="" />
        ),
      },
    ]);
  };

  return (
    <div className="w-full h-full p-3">
      <Btn className="!w-full upload">
        <div className="w-full bg-gradient rounded-[4px] text-[#222]">
          <input
            type="file"
            className="custom-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDragLeave}
            onChange={uploadImage}
            id="fileInput"
          />
        </div>
      </Btn>
      <div className="mt-2 w-full">
        {images.map((data, key) => (
          <Btn
            className="bg-white !m-1"
            key={key}
            onClick={() => addImage(data.data)}
          >
            <img
              src={data.data}
              alt={data.name}
              className="image rounded-[3px]"
            />
          </Btn>
        ))}
        {images.length === 0 && (
          <NotFound
            heading="No Uploads Found"
            description="Please Upload an image to see it here"
          />
        )}
      </div>
    </div>
  );
};

export default UploadArea;
