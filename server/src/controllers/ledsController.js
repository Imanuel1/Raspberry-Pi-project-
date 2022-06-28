import { findAllLedsStatus, updateLedsBlinks, updateLedStatus } from "../services";

const getAllLedsStatus = async (_req, res, next) => {
  try {
    const allLedsStatus = await findAllLedsStatus();

    console.log("Get all LEDs status was successful");
    res.send(allLedsStatus);
  } catch (error) {
    console.error(`Get all LEDs status failed: ${error}`);
    next(error);
  }
};

const putLedsBlinks = async (
  req,
  res,
  next
) => {
  const {
    body: data,
  } = req;

  try {
    const updatedLedsBlinks =
      await updateLedsBlinks(data);

    console.log(
      `Put Leds Blinks was successful`
    );
    res.send(updatedLedsBlinks);
  } catch (error) {
    console.error(
      `Put Leds Blinks failed: ${error}`
    );
    next(error);
  }
};
const putLedStatus = async (
  req,
  res,
  next
) => {
  const {
    body: data,
  } = req;

  try {
    const updatedLedStatus =
      await updateLedStatus(data);

    console.log(
      `Put Led Status with id ${data.id} was successful`
    );
    res.send(updatedLedStatus);
  } catch (error) {
    console.error(
      `Put Led Status with id ${data.id} failed: ${error}`
    );
    next(error);
  }
};

export { getAllLedsStatus, putLedsBlinks, putLedStatus };
