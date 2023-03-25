export default function convertTimeMMSS(seconds) {
  if (!seconds) {
    return null;
  }
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}
