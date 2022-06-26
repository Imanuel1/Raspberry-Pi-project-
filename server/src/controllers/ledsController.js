import { findAllLedsStatus } from "../services/ledsService";


const getAllLedsStatus = async (_req, res, next) => {
  try {
    const allLedsStatus = await findAllLedsStatus();

    console.log("Get all LEDs status was successful");
    res.send(allLedsStatus);
  } catch (error) {
    console.error(
      `Get all community critical infrastructure protection failed: ${error}`
    );
    next(error);
  }
};

export {getAllLedsStatus}
