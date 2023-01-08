export function calcTime(expirationTime) {
    const currentTime = new Date().getTime();
    const adjExpirationTime = currentTime + expirationTime;

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
}