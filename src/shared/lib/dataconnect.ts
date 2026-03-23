import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from './generated-fdc';
import { app } from './firebase';

const emulatorEnabled =
  process.env.NEXT_PUBLIC_USE_DATACONNECT_EMULATOR === 'true';

const emulatorHost =
  process.env.NEXT_PUBLIC_DATACONNECT_EMULATOR_HOST || '127.0.0.1';

const emulatorPort = Number(
  process.env.NEXT_PUBLIC_DATACONNECT_EMULATOR_PORT || '9399'
);

const dataConnect = getDataConnect(app, connectorConfig);

let emulatorConnected = false;

function ensureEmulatorConnection() {
  if (!emulatorEnabled || emulatorConnected) {
    return;
  }

  connectDataConnectEmulator(dataConnect, emulatorHost, emulatorPort, false);
  emulatorConnected = true;
}

export function getMedAssistDataConnect() {
  ensureEmulatorConnection();
  return dataConnect;
}

export function getDataConnectRuntimeLabel() {
  return emulatorEnabled
    ? `emulator:${emulatorHost}:${emulatorPort}`
    : 'cloud';
}
