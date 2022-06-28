

const findAllLedsStatus = async () =>
// await ...
console.log("leds status")

const updateLedsBlinks = async (data) => 
console.log("leds blinks "  + data)

const updateLedStatus = async (data) => 
console.log("led state update " + data)



export {findAllLedsStatus, updateLedsBlinks, updateLedStatus}