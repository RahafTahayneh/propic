import {useCallback, useEffect, useState} from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { toast } from "react-hot-toast";

import { AppFooter, AppHeader, Rnd } from "./index";

const Editor = ({ data, setData, children, Code }) => {
  const [anchorEl, setAnchorEl] = useState(null); // for menu
  const [fileName, setFileName] = useState("Untitled Design");

  const coverImage = document.querySelector("#cover_image_download");

  const resizeCoverImage = () => {
    const cover_image = document.querySelector("#cover_image_preview");
    const container = document.querySelector(".container");

    const maxWidth = cover_image.offsetWidth;
    const maxHeight = cover_image.offsetHeight;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    let scale;

    if (width >= maxWidth && height >= maxHeight) {
      cover_image.style.transform = "";
      return;
    }

    scale = Math.min(width / maxWidth, height / maxHeight);

    cover_image.style.transform = `scale(${scale})`;
  };

  useEffect(() => {
    resizeCoverImage();

    window.addEventListener("resize", resizeCoverImage);
  });

  const showLeftBar = () => {
    if (document.querySelector("#leftBar").style.left === "0%") {
      document.querySelector("#leftBar").style.left = "-100%";
    } else {
      document.querySelector("#leftBar").style.left = "0%";
    }
  };

  const addInnerHtml = useCallback(() => {
    coverImage?.innerHTML = document.getElementById(
      "cover_image_preview"
    )?.innerHTML;
    console.log(coverImage?.innerHTML)
  }, [coverImage?.innerHTML]);

  const getShareImage = async () => {
    addInnerHtml();

    let base64Image;
    await html2canvas(coverImage, {
      useCORS: true,
    }).then((canvas) => {
      base64Image = canvas.toDataURL("image/png").slice(22);
    });

    const formData = new FormData();
    formData.append("image", base64Image);
    formData.append("name", fileName);
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_STORAGE_KEY)

    const upload = axios
      .post("https://api.imgbb.com/1/upload", formData)
      .then((data) => {
        navigator.clipboard.writeText(data.data.data.url);
      });

    toast.promise(upload, {
      loading: "Creating shareable image...",
      success: "Image URL is copied to clipboard",
      error: "Something went wrong when creating shareable image",
    });
  };

  const downloadAsPng = () => {
    addInnerHtml();

    const downloadImage = html2canvas(coverImage, {
      useCORS: true,
    }).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = fileName + "png";
      a.click();
    });

    toast.promise(downloadImage, {
      loading: "Saving",
      success: `Saved ${fileName}.png`,
      error: "Something went wrong",
    });
  };

  const downloadAsJpg = () => {
    addInnerHtml();

    const downloadImage = html2canvas(coverImage, {
      useCORS: true
    }).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpg")
      a.download = fileName + "jpg"
      a.click()
    });

    toast.promise(downloadImage, {
      loading: "Saving",
      success: `Saved ${fileName}.jpg`,
      error: "Something went wrong",
    });
  };

  const downloadAsSvg = () => {
    addInnerHtml();

    html2canvas(coverImage, {
      useCORS: true
    }).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const svgImg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      )

      svgImg.setAttribute("height", "")
      svgImg.setAttribute("width", "")
      svgImg.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", image)

      document.getElementById("mySvg").appendChild(svgImg)

      const svgDataURL = (svg) => {
        const svgAsXML = new XMLSerializer().serializeToString(svg);
        return "data:image/svg+xml"
      }

      const a = document.createElement("a");
      a.href = svgDataURL(document.getElementById("mySvg"))
      a.download = fileName + ".svg";
      a.click();

      toast.success(`Saved ${fileName}.svg`)
    })
  };

  useEffect(() => {
    const coverImagePreview = document.getElementById("cover_image_preview");
    const coverImageDownload = document.getElementById("cover_image_download");

    if (data.background.type === "solid") {
      coverImagePreview.style.background = data.background.color;
      coverImageDownload.style.background = data.background.color;
    } else if (data.background.type === "gradient") {
      coverImagePreview.style.background = `linear-gradient(${data.background.direction}deg, ${data.background.color1}, ${data.background.color2})`;
      coverImageDownload.style.background = `linear-gradient(${data.background.direction}deg, ${data.background.color1}, ${data.background.color2})`;
    } else if (data.background.type === "pattern") {
      coverImagePreview.style.backgroundColor = data.background.color1;
      coverImagePreview.style.backgroundImage = `url("${data.background.pattern}")`;
      coverImagePreview.style.backgroundSize = "auto";
      coverImageDownload.style.backgroundColor = data.background.color1;
      coverImageDownload.style.backgroundImage = `url("${data.background.pattern}")`;
      coverImageDownload.style.backgroundSize = "auto";
    } else if (data.background.type === "image") {
      if (data.background.src) {
        coverImagePreview.style.backgroundImage = `url("${data.background.src}")`;
        coverImagePreview.style.backgroundSize = "cover";
        coverImageDownload.style.backgroundImage = `url("${data.background.src}")`;
        coverImageDownload.style.backgroundSize = "cover";

        document.querySelector(".overlay").style.background =
          data.background.color;
        document.querySelector(".overlay").style.opacity =
          data.background.opacity;
      }
    }
  }, [data]);

  const AppHeaderProps = {
    anchorEl,
    setAnchorEl,
    fileName,
    setFileName,
    showLeftBar,
    getShareImage,
    downloadAsPng,
    downloadAsJpg,
    downloadAsSvg,
  };

  return (
    <div className="h-full w-full lg:w-[67.5%] xl:w-[67.5%] relative bg-white flex items-center justify-center flex-col">
      <div id="cover_image_download" className="absolute z-[-10] cover_image" />
      <svg
        id="mySvg"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        className="absolute z-[-10]"
      />
      <AppHeader {...AppHeaderProps} />
      <div className="h-full overflow-hidden w-full relative flex items-center justify-center container">
        <div className="scale-[.95] lg:scale-[.85]">
          <div
            id="cover_image_preview"
            className="relative cover_image bg-blue-700 overflow-hidden select-none"
          >
            <div className="overlay" />
            {children.map((child, key) => (
              <Rnd key={key}>{child.component}</Rnd>
            ))}
            {Code()}
            <div className="w-full py-[30px] z-[0] opacity-0 hover:opacity-100 position-tracker">
              <div className="w-full h-[3px] bg-red-500" />
            </div>
            <div className="h-full px-[30px] z-[0] opacity-0 hover:opacity-100 position-tracker">
              <div className="w-[3px] h-full bg-red-500" />
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default Editor;
