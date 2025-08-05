import DashboardLayout from '@/components/layouts/DashboardLayout';
import beaconConnection from '@/connections';
import { useEffect, useState } from 'react';
import BeaconPage from '../Beacon';

const DashboardPage = () => {
  const [beacons, setBeacons] = useState<TBeaconConnection[]>([]);

  useEffect(() => {
    beaconConnection
      .start()
      .then(() => {
        console.log('SignalR connected ✅');
        beaconConnection.on('BeaconReceived', (beacon: TBeaconConnection) => {
          console.log('New Beacon Received:', JSON.stringify(beacon));
          setBeacons((prev) => [beacon, ...prev]);
        });
      })
      .catch((err: Error) => console.error('beaconConnection error:', err));
  }, []);

  return (
    <DashboardLayout title="Beacons">
      <BeaconPage />
    </DashboardLayout>
  );
};

export default DashboardPage;
