import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_PUBLIC_SOCKET_URL);

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [socketSts, setSocketSts] = useState("Disconnected");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketSts("Connected");
    });

    socket.on("disconnect", () => {
      setSocketSts("Disconnected");
    });

    socket.on("image_uploaded", (data) => {
      console.log("File uploaded:", data);
      alert("File uploaded successfully");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("image_uploaded");
    };
  }, []);

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", selectedImage.raw);
    if (socket) {
      formData.append("socketId", socket.id);
    }

    const api = axios.create({
      baseURL: process.env.REACT_APP_PUBLIC_API_URL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(formData.get("imageFile"));
    console.log(formData.get("socketId"));
    console.log(api);
    console.log(selectedImage)
    try {
      const response = await api.post("files/", formData);
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="uploadScreen">

      <div>
        <h2>Socket Status: {socketSts}</h2>
      </div>
      {/* Select Image */}
      <form
      onClick={() => document.querySelector(".input-field").click()}
      >
        <input type="file" accept='image/*' className='input-field' hidden 
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            setSelectedImage({
              preview: URL.createObjectURL(files[0]),
              raw: files[0]
            })
          }
        }}
         />

        {selectedImage ?
        <img src={selectedImage.preview} width={150} height={150} alt={fileName} />
        : 
        <>
        <MdCloudUpload color='#2E4052' size={60} />
        <p>Browse Files to upload</p>
        </>
      }

      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='#2E4052' />
        <span className='upload-content'>
          {fileName} - 
          <MdDelete
          onClick={() => {
            setFileName("No selected File")
            setSelectedImage(null)
          }}
           />
        </span>
      </section>

          {/* Upload Image */}
      <button className="upload__button" onClick={handleUpload}>
        <span className="button__style">Upload Image</span>
      </button>
    </div>
  );
};

export default ImageUpload;
