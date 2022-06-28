import { io } from "..";

const pigpio = require("pigpio-client").pigpio({ host: "192.168.1.213" });
// control LEDs on GPIO 22/4/27
export const led1 = pigpio.gpio(22);
export const led2 = pigpio.gpio(4);
export const led3 = pigpio.gpio(27);
// get events from a button on GPIO 24
export const button = pigpio.gpio(24);

const ready = new Promise((resolve, reject) => {
  pigpio.once("connected", resolve);
  pigpio.once("error", reject);
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const toggleLed = async (led) => {
  if ((await led.read()) == "1") {
    await led.write(0);
  } else if ((await led.read()) == "0") {
    await led.write(1);
  }
  await wait(50);
};

const blinks = async (led) => {
  for (let index = 0; index < 6; index++) {
    await toggleLed(led);
  }
};

export const ledsBlink = () => {
  blinks(led1);
  blinks(led2);
  blinks(led3);
};

export const gpioInit = () => {
  ready
    .then(async (info) => {
      // display information on pigpio and connection status
      console.log(JSON.stringify(info, null, 2));
      await led1.modeSet("output");
      await led2.modeSet("output");
      await led3.modeSet("output");
      await button.modeSet("input");
      await button.modeSet("input");
      let so;
      io.on("connection", (socket) => {
        so= socket;
        console.log("socket on connection")
      });
      button.notify((level, tick) => {
        console.log(`Button changed to ${level} at ${tick} usec`);
        so.emit("button", level);
      });
    })
}

