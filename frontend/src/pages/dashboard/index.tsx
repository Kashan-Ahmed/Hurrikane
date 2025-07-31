import DashboardLayout from "@/components/layouts/DashboardLayout";
import beaconConnection from "@/connections";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [beacons, setBeacons] = useState<TBeaconConnection[]>([]);

  useEffect(() => {
    beaconConnection
      .start()
      .then(() => {
        console.log("SignalR connected ✅");
        beaconConnection.on("BeaconReceived", (beacon: TBeaconConnection) => {
          console.log("New Beacon Received:", JSON.stringify(beacon));
          setBeacons((prev) => [beacon, ...prev]);
        });
      })
      .catch((err: Error) => console.error("beaconConnection error:", err));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      <section className="m-20 grid gap-8 pl-14 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        <main className="col-span-4 lg:col-span-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>BeaconID</th>
                <th>PlantID</th>
                <th>MachNo</th>
                <th>MachIP</th>
                <th>Version</th>
                <th>Shift</th>
                <th>Event</th>
                <th>LifeTime</th>
                <th>Length</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {beacons.map((b, idx) => (
                <tr key={idx}>
                  <td>{b.id}</td>
                  <td>{b.beaconID}</td>
                  <td>{b.plantID}</td>
                  <td>{b.machNo}</td>
                  <td>{b.machIP}</td>
                  <td>{b.version}</td>
                  <td>{b.shiftCode}</td>
                  <td>{b.event}</td>
                  <td>{b.lifeTime}</td>
                  <td>{b.length}</td>
                  <td>{new Date(b.created).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        <aside className="hidden max-h-[70vh] overflow-y-scroll lg:col-span-2 lg:block"></aside>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
