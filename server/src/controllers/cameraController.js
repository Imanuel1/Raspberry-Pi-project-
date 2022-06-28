import { findAllCameraImg } from "../services";

const getAllCameraImg = async (_req, res, next) => {
  try {
    const allCameraImg = await findAllCameraImg();

    console.log("Get all Camera Image was successful");
    res.send(allCameraImg);
  } catch (error) {
    console.error(
      `Get all Camera Image failed: ${error}`
    );
    next(error);
  }
};

export {getAllCameraImg}