// signalr.js
import * as signalR from "@microsoft/signalr";

const beaconConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/beaconHub") // change this if your SignalR hub is hosted elsewhere
  .withAutomaticReconnect()
  .build();

export default beaconConnection;
