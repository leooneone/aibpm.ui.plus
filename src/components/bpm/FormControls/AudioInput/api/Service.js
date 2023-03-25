export default class Service {
  constructor(backendEndpoint,headers) {
    this.backendEndpoint = backendEndpoint;
    this.headers = headers;
  }

  // returns true if successfull, false if failed
  async postBackend(recordedBlob) {
    try {
      const response = await fetch(this.backendEndpoint, {
        method: "POST",
        body: recordedBlob,
        headers:this.headers
      });
      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
