import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { v4 as uuid } from "uuid";
import Notification from "../common/Notification";
import imageService from "../../services/imageService";

const confetti = require("../../img/confetti.png");
const trees = require("../../img/puut.png");
const viritys = require("../../img/Telefunken_FuBK.png");

const LoggedIn = ({ user }) => {
  const [webcamON, setWebcamON] = useState(false);
  const [uploadingON, setUploadingON] = useState(false);
  const [sticker1, setSticker1] = useState(false);

  const [previews2, setPreviews2] = useState([]);
  const [notification, setNotification] = useState(null);
  const [getPreviews, setGetPreviews] = useState(false);

  const canvasRef = useRef();
  const stickerCanvasRef = useRef();
  const fileInputRef = useRef();
  const webcamRef = useRef();

  const unique_id = uuid();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviews = async () => {
      if (user) {
        const res = await imageService.getPreviews(user);
        setPreviews2(res);
      }
      setGetPreviews(false);
    };
    fetchPreviews();
  }, [user, getPreviews]);

  console.log("previews2", previews2);

  useEffect(() => {
    if (webcamON && webcamRef.current) {
      // console.log("WEBCAMREF", webcamRef.current.video);
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const stream = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(stream);
      };
      stream();
    }
  }, [webcamON, webcamRef, canvasRef]);

  // TAKE PHOTO
  const capture = useCallback(() => {
    let imageSrc;

    if (webcamON) {
      const canvas = canvasRef.current;
      const stickerCanvas = stickerCanvasRef.current;
      const context = canvas.getContext("2d");
      const video = webcamRef.current.video;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      context.drawImage(stickerCanvas, 0, 0, canvas.width, canvas.height);

      // imageSrc = webcamRef.current.getScreenshot();
      imageSrc = canvas.toDataURL("image/png");
      // console.log("SCREENSHOOOOT", imageSrc);
    } else if (uploadingON) {
      const canvas = canvasRef.current;
      const stickerCanvas = stickerCanvasRef.current;

      const context = canvas.getContext("2d");
      context.drawImage(stickerCanvas, 0, 0, canvas.width, canvas.height);

      imageSrc = canvas.toDataURL("image/png");
      // console.log("UPLOAD CAPTURE", imageSrc);
    }

    // setTest(imageSrc);

    const savePreview = async () => {
      const response = await fetch(imageSrc);
      const blobImage = await response.blob();
      const fileImage = new File([blobImage], `${unique_id}.jpg`, {
        type: "image/jpg",
      });

      try {
        const res = await imageService.savePreview(fileImage, user);
        console.log("taa", res);
        // setPreviews(res.filePath);
        setNotification({ message: res.message, style: res.style });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } catch (error) {
        console.error("ERROR UPLOADING IMAGE", error);
      }
    };
    setGetPreviews(true);
    savePreview();
  }, [webcamRef, webcamON, uploadingON, canvasRef, unique_id, user]);

  // DELETE / USE PREVIEW
  const delPreview = async (image) => {
    const res = await imageService.deletePreview(image);
    console.log("Del Preview res", res);
    setNotification({ message: res.message, style: res.style });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    setGetPreviews(true);
  };

  const addPreview = async (image) => {
    console.log("image", image);
    navigate(`/loggedIn/${image._id}`);
  };

  // STICKERS
  const addSticker1 = () => {
    setSticker1(true);
    const stickerCanvas = stickerCanvasRef.current;
    const stickerContext = stickerCanvas.getContext("2d");
    const stickerImage = new Image();

    stickerImage.onload = () => {
      stickerContext.clearRect(0, 0, stickerCanvas.width, stickerCanvas.height);
      stickerContext.drawImage(
        stickerImage,
        0,
        0,
        stickerCanvas.width,
        stickerCanvas.height
      );
    };
    stickerImage.src = trees;
    console.log("Added PUUT Sticker.");
  };

  const removeSticker1 = () => {
    setSticker1(false);
    const stickerCanvas = stickerCanvasRef.current;
    const stickerContext = stickerCanvas.getContext("2d");
    stickerContext.clearRect(0, 0, stickerCanvas.width, stickerCanvas.height);
    console.log("Removed PUUT Sticker.");
  };

  //IMAGE UPLOAD
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("FILE", file);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    if (file) {
      image.src = URL.createObjectURL(file);
      setUploadingON(!uploadingON);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas Cleared!");
    setUploadingON(false);
  };

  return (
    <div
      className="font flex min-h-screen flex-col text-blue-200 md:max-h-screen md:flex-row"
      style={{
        backgroundImage: `url(${confetti})`,
      }}
    >
      {/* STICKERS */}
      <div className="h-30 flex w-screen justify-center gap-4 border-4 border-red-600 md:h-screen md:w-1/5 md:flex-col md:items-center md:justify-start">
        <div className="hidden w-full p-2 md:flex md:h-auto md:justify-center">
          Stickers:
        </div>
        <div className="my-2 flex w-1/4 border border-yellow-200 md:h-1/4 md:w-full md:flex-col md:items-center md:justify-center">
          <div className="relative h-full w-full border-2 border-blue-400">
            <img
              src={trees}
              alt="flowers"
              className="object-fit h-full w-full bg-gray-300"
            />
            {/* <div className="absolute inset-x-0 bottom-0 border-2 border-yellow-300 text-center"> */}
            <Button
              size="xs"
              className="absolute inset-x-0 bottom-0 mx-4 flex max-w-sm border-2 border-yellow-300 text-center"
              onClick={!sticker1 ? addSticker1 : removeSticker1}
            >
              {!sticker1 ? "Add" : "Remove"}
            </Button>
            {/* </div> */}
          </div>
        </div>
        <div className="my-2 flex w-1/4 border border-yellow-200 md:h-1/4 md:w-full md:flex-col md:items-center md:justify-center">
          <div className="relative h-full w-full border-2 border-blue-400">
            <img
              src={trees}
              alt="flowers"
              className="h-full w-full border border-red-600 bg-gray-300 object-cover"
            />
            {/* <div className="absolute inset-x-0 bottom-0 border-2 border-yellow-300 text-center"> */}
            <Button
              size="xs"
              className="absolute inset-x-0 bottom-0 mx-4 flex max-w-sm border-2 border-yellow-300 text-center"
              onClick={!sticker1 ? addSticker1 : removeSticker1}
            >
              {!sticker1 ? "Add" : "Remove"}
            </Button>
            {/* </div> */}
          </div>
        </div>
        <div className="my-2 flex w-1/4 border border-yellow-200 md:h-1/4 md:w-full md:flex-col md:items-center md:justify-center">
          <div className="relative h-full w-full border-2 border-blue-400">
            <img
              src={trees}
              alt="flowers"
              className="h-full w-full border border-red-600 bg-gray-300 object-cover"
            />
            {/* <div className="absolute inset-x-0 bottom-0 border-2 border-yellow-300 text-center"> */}
            <Button
              size="xs"
              className="absolute inset-x-0 bottom-0 mx-4 flex max-w-sm border-2 border-yellow-300 text-center"
              onClick={!sticker1 ? addSticker1 : removeSticker1}
            >
              {!sticker1 ? "Add" : "Remove"}
            </Button>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* CENTER DIV */}
      <div className="flex  w-full flex-col border-4 border-blue-400 p-6 md:h-auto md:w-3/5 md:justify-center">
        <div
          className="relative m-2 h-3/4 border-4 border-red-600"
          // style={{ height: "50%" }}
        >
          <div style={{ paddingTop: "100%" }}></div>
          <div className="absolute bottom-0 left-0 right-0 top-0 flex p-2">
            <canvas
              className="z-10 h-full w-full"
              id="myCanvas"
              ref={canvasRef}
              style={{
                backgroundImage: `url(${viritys})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {webcamON && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                // mirrored
                style={{ opacity: "0%" }}
              />
            )}
            {/* {webcamON ? (
              <Webcam
                className="z-10 h-full w-full bg-gray-400"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                // mirrored
                // style={{ opacity: "50%" }}
              />
            ) : (
              <canvas
                className="z-10 h-full w-full bg-gray-400"
                id="myCanvas"
                ref={canvasRef}
              />
            )} */}
            <canvas
              className="absolute left-2 top-2 z-20"
              ref={stickerCanvasRef}
              draggable
            />
            <Button
              className="absolute bottom-5 left-0 right-0 z-10 mx-auto h-16 w-1/4 p-2 text-red-500"
              onClick={() => {
                capture();
                clearCanvas();
                removeSticker1();
                setUploadingON(false);
                setWebcamON(false);
                console.log("Photo taken!");
              }}
              disabled={!webcamON && !uploadingON ? true : false}
            >
              Take Photo!
            </Button>
          </div>
        </div>
        <Notification message={notification} />
        <div className="flex items-center justify-center">
          <div className="z-10 m-6 flex h-auto flex-wrap justify-center border-2 border-green-400 p-2 md:h-auto md:w-full md:justify-between">
            <Button
              className="m-2 flex p-2"
              onClick={() => {
                setWebcamON(true);
                console.log("Started Webcam!");
              }}
              disabled={webcamON || uploadingON ? true : false}
            >
              Start Webcam
            </Button>
            <Button
              className="m-2 flex p-2"
              onClick={() => {
                setWebcamON(false);
                clearCanvas();
                removeSticker1();
                console.log("Webcam Off!");
              }}
              disabled={webcamON ? false : true}
            >
              Stop Webcam
            </Button>
            <>
              <Button
                className="m-2 flex p-2"
                onClick={() => {
                  console.log("uploading image.");
                  if (uploadingON) {
                    clearCanvas();
                  }
                  if (!uploadingON) {
                    fileInputRef.current.click();
                  }
                }}
                disabled={webcamON ? true : false}
              >
                {!uploadingON ? "Upload Image" : "Stop Uploading"}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </Button>
            </>
          </div>
        </div>
      </div>
      {/* PREVIEW */}
      <div className="h-40 justify-center overflow-x-scroll border border-orange-400 text-center md:flex md:h-screen md:w-1/5 md:flex-col md:items-center md:justify-start md:overflow-y-scroll">
        <div className="hidden w-full border-2 border-blue-300 p-2 md:flex md:h-auto md:justify-center">
          Preview:
        </div>
        {previews2
          ? previews2.map((p) => (
              <div
                className="preview mx-2 my-2 inline-block w-64 border border-yellow-200 md:flex md:h-1/4 md:w-full md:flex-col md:items-center md:justify-center"
                key={p._id}
              >
                <div className="relative h-full w-full">
                  <img
                    src={p.image.path}
                    alt="preview"
                    className="object-fit h-full w-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 mx-2 flex justify-between border-4 border-green-400">
                    <Button
                      className="flex md:px-2"
                      size="xs"
                      onClick={() => addPreview(p)}
                    >
                      Use
                    </Button>
                    <Button
                      className="flex md:px-2"
                      size="xs"
                      onClick={() => delPreview(p)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : null}
        {/* <div className="preview my-2 inline-block w-64 border border-yellow-200 md:flex md:h-1/4 md:w-full md:flex-col md:items-center md:justify-center">
          <div className="relative h-full w-full">
            <img
              src={previews2}
              alt="preview"
              className="object-fit h-full w-full"
            />
            <div className="absolute inset-x-0 bottom-0 mx-2 flex justify-between border-4 border-green-400">
              <Button className="flex md:px-2" size="xs">
                Use
              </Button>
              <Button className="flex md:px-2" size="xs">
                Delete
              </Button>
            </div>
          </div>
        </div>
        <div className="preview my-2 inline-block w-64 border border-yellow-200 md:flex md:h-1/4 md:w-full md:flex-col md:items-center md:justify-center">
          a
        </div>
        <div className="preview my-2 inline-block w-64 border border-yellow-200 md:flex md:h-1/4 md:w-full md:flex-col md:items-center md:justify-center">
          a
        </div> */}
        {/* <div className="m-2 p-2">Preview:</div>
        <div className="m-auto items-center overflow-y-scroll lg:h-full lg:w-full">
          <div className="mx-auto mb-2 flex flex-col border border-red-400 p-2 lg:h-1/4 lg:w-3/4">
            <div className="mb-2 flex h-auto flex-grow rounded-md border border-yellow-200">
              <img
                src={test}
                alt="testpic"
                className="object-fit flex h-full w-full"
              />
            </div>
            <div className="flex justify-between">
              <Button size="xs">Use</Button>
              <Button size="xs">Delete</Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoggedIn;
