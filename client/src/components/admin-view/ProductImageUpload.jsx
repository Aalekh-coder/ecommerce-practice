import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) => {
  const inputRef = useRef();

  const handleImageFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data
    );
    if (response) {
      setUploadedImageUrl(response.data?.result?.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto px-6 mt-4">
      <Label className={"text-lg font-semibold mb-2 block"}>Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg ${isEditMode && "opacity-60"}`}
      >
        <Input
          disabled={isEditMode}
          id="image-upload"
          type={"file"}
          className={"hidden"}
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode && "cursor-not-allowed"
            } flex flex-col items-center justify-center h-32 cursor-pointer duration-300`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag & Drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className={"h-10 bg-gray-100"} />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center p-4 duration-300">
              <FileIcon className="w-8 h-8 text-primary mr-2 " />
            </div>
            <p className="text-sm font-medium text-gray-500 duration-300">
              {imageFile?.name?.slice(0, 15)}
            </p>
            <Button
              onClick={handleRemoveImage}
              variant={"ghost"}
              size={"icon"}
              className={
                "text-muted-foreground hover:text-foreground duration-300"
              }
            >
              <XIcon className="w-4 h-4 " />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
