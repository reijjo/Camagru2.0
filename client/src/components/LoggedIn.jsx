import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "flowbite-react";
import imageService from "../services/imageService";
import { v4 as uuid } from "uuid";

const confetti = require("../img/confetti.png");
const tpbg = require("../img/transparent_background.jpg");
const trees = require("../img/puut.png");
const chinese = require("../img/pattern_chinese.png");
const viritys = require("../img/Telefunken_FuBK.png");

const LoggedIn = ({ user }) => {
  const [webcamON, setWebcamON] = useState(false);
  const [uploadingON, setUploadingON] = useState(false);
  const [sticker1, setSticker1] = useState(false);

  const [test, setTest] = useState("");

  const canvasRef = useRef();
  const stickerCanvasRef = useRef();
  const fileInputRef = useRef();
  const webcamRef = useRef();

  const unique_id = uuid();

  // console.log("USEERRR", user.user.id);

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

  const capture = useCallback(async () => {
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
      console.log("UPLOAD CAPTURE", imageSrc);
    }

    setTest(imageSrc);

    const savePreview = async (image, user) => {
      const blobImage = await (await fetch(image)).blob();
      const fileImage = new File([blobImage], `${unique_id}.png`, {
        type: "image/png",
      });

      try {
        const res = await imageService.savePreview(fileImage, user);
        console.log("taa", res);
      } catch (error) {
        console.error("ERROR UPLOADING IMAGE", error);
      }
    };

    await savePreview(test, user.user);
  }, [webcamRef, webcamON, uploadingON, canvasRef, test, user, unique_id]);

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
      // setTest(image.src);
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
      className="font flex flex-col text-blue-200 lg:flex-row"
      style={{
        backgroundImage: `url(${confetti})`,
      }}
    >
      {/* STICKERS */}
      <div className="lg:flex lg:h-auto lg:w-1/5 lg:flex-col lg:items-center lg:justify-start lg:border">
        <div className="m-2 p-2">Stickers:</div>
        <div className="m-2 flex flex-col border border-yellow-200 p-2 lg:h-1/3 lg:w-3/4">
          <div
            className="mb-2 flex h-auto flex-grow items-center justify-center rounded-md border border-red-200 bg-gray-50"
            // style={{ backgroundImage: `url(${tpbg})` }}
          >
            <img src={trees} alt="flowers" className="h-full w-full" />
          </div>
          <div className="flex justify-center">
            <Button
              className=""
              onClick={!sticker1 ? addSticker1 : removeSticker1}
            >
              {!sticker1 ? "Add" : "Remove"}
            </Button>
            {/* <Button>Remove</Button> */}
          </div>
        </div>
        <div className="m-2 flex flex-col border border-yellow-200 p-2 lg:h-1/3 lg:w-3/4">
          <div
            className="mb-2 flex h-auto flex-grow items-center justify-center border border-red-200"
            style={{ backgroundImage: `url(${tpbg})` }}
          >
            sticker
          </div>
          <div className="flex justify-between">
            <Button className="">Add</Button>
            <Button>Remove</Button>
          </div>
        </div>
        <div className="m-2 flex flex-col border border-yellow-200 p-2 lg:h-1/3 lg:w-3/4">
          <div
            className="mb-2 flex h-auto flex-grow items-center justify-center border border-red-200"
            style={{ backgroundImage: `url(${tpbg})` }}
          >
            sticker
          </div>
          <div className="flex justify-between">
            <Button className="">Add</Button>
            <Button>Remove</Button>
          </div>
        </div>
      </div>
      {/* CENTER DIV */}
      <div className="flex flex-col p-24 lg:w-3/5 lg:border">
        <div
          className="relative m-2 border-4 border-red-600"
          style={{ height: "50%" }}
        >
          <div style={{ paddingTop: "100%" }}></div>
          <div className="absolute bottom-0 left-0 right-0 top-0 p-2">
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
        <div className="z-10 m-6 flex flex-wrap justify-between border-2 border-green-400 p-2">
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
            className="m-2 p-2"
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
              className="m-2 p-2"
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
      {/* PREVIEW */}
      <div className="lg:flex lg:h-auto lg:w-1/5 lg:flex-col lg:items-center lg:justify-start lg:border">
        <div className="m-2 p-2">Preview:</div>
        <div className="m-auto items-center overflow-y-scroll lg:h-full lg:w-full">
          <div className="mx-auto mb-2 flex flex-col border border-red-400 p-2 lg:h-1/4 lg:w-3/4">
            <div className="mb-2 flex h-auto flex-grow overflow-hidden rounded-md border border-yellow-200">
              {!test ? (
                <img
                  src={chinese}
                  alt="testpic"
                  className="flex h-full w-full object-cover"
                />
              ) : (
                <img
                  src={test}
                  alt="testpic"
                  className="object-fit flex h-full w-full"
                />
              )}
            </div>
            <div className="flex justify-between">
              <Button size="xs">Use</Button>
              <Button size="xs">Remove</Button>
            </div>
          </div>
          <div className="mx-auto mb-2 flex flex-col border border-red-400 p-2 lg:h-1/4 lg:w-3/4">
            <div className="mb-2 flex h-auto flex-grow rounded-md border border-yellow-200">
              <img
                src={chinese}
                alt="testpic"
                className="flex h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-between">
              <Button size="xs">Use</Button>
              <Button size="xs">Delete</Button>
            </div>
          </div>
          <div className="mx-auto mb-2 flex flex-col border border-red-400 p-2 lg:h-1/4 lg:w-3/4">
            <div className="mb-2 flex h-auto flex-grow rounded-md border border-yellow-200">
              <img
                src={chinese}
                alt="testpic"
                className="flex h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-between">
              <Button size="xs">Use</Button>
              <Button size="xs">Delete</Button>
            </div>
          </div>
          <div className="mx-auto mb-2 flex flex-col border border-red-400 p-2 lg:h-1/4 lg:w-3/4">
            <div className="mb-2 flex h-auto flex-grow rounded-md border border-yellow-200">
              <img
                src={chinese}
                alt="testpic"
                className="flex h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-between">
              <Button size="xs">Use</Button>
              <Button size="xs">Delete</Button>
            </div>
          </div>
          <div className="mx-auto mb-2 flex flex-col border border-red-400 p-2 lg:h-1/4 lg:w-3/4">
            <div className="mb-2 flex h-auto flex-grow rounded-md border border-yellow-200">
              <img
                src={chinese}
                alt="testpic"
                className="flex h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-between">
              <Button size="xs">Use</Button>
              <Button size="xs">Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
