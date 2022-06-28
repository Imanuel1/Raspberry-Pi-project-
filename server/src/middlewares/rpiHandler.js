const pigpio = require("pigpio-client").pigpio({ host: "192.168.1.213" });
// control LEDs on GPIO 22/4/27
const led1 = pigpio.gpio(22);
const led2 = pigpio.gpio(4);
const led3 = pigpio.gpio(27);
// get events from a button on GPIO 24
const button = pigpio.gpio(24);

const ready = new Promise((resolve, reject) => {
  pigpio.once("connected", resolve);
  pigpio.once("error", reject);
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const rpiHandler = (req, res, next) => {
  ready
    .then(async (info) => {
      // display information on pigpio and connection status
      console.log(JSON.stringify(info, null, 2));
      await led1.modeSet("output");
      await led2.modeSet("output");
      await led3.modeSet("output");
      await button.modeSet("input");
    })
    .catch(console.error);
};

ready
  .then(async (info) => {
    // display information on pigpio and connection status
    console.log(JSON.stringify(info, null, 2));

    // get events from a button on GPIO 17
    const button = pigpio.gpio(24);
    await button.modeSet("input");
    button.notify((level, tick) => {
      console.log(`Button changed to ${level} at ${tick} usec`);
    });

    // control an LED on GPIO 4
    const led = pigpio.gpio(22);
    await led.modeSet("output");
    await led.write(0); // turn off LED
    await wait(500);
    await led.write(1); // turn on
    await wait(500);

    // use waves to blink the LED rapidly (toggle every 100ms)
    await led.waveClear();
    await led.waveAddPulse([
      [0, 1, 50000],
      [1, 0, 50000],
    ]);
    const blinkWave = await led.waveCreate();
    led.waveChainTx([{ loop: false }, { waves: [blinkWave] }, { repeat: 3 }]);
  })
  .catch(console.error);
