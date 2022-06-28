import { led1, led2, led3, ledsBlink, toggleLed } from "../middlewares/rpiHandler"

const findAllLedsStatus = async () => {
    const statusLed1 = await led1.read();
    const statusLed2 = await led2.read();
    const statusLed3 = await led3.read();
    return {led1: statusLed1, led2: statusLed2, led3: statusLed3}
}


const updateLedsBlinks = async (data) => {
    ledsBlink()
    console.log(`leds blinks ${JSON.stringify(data)}`)
}

const updateLedStatus = async (data) => {
    const Leds = {"led1": led1, "led2": led2, "led3": led3};
    const ledId = data.id;
    await toggleLed(Leds[ledId]);
    console.log(`led state update ${JSON.stringify(data)}`)
    const resultState = await Leds[ledId].read();
    return {status: resultState}
}


export {findAllLedsStatus, updateLedsBlinks, updateLedStatus}