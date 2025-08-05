import DataTable from '@/components/common/DataTable';
import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import beaconConnection from '@/connections';

const INITIAL_PAGINATION = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
};

const BeaconPage = () => {
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

    const columns = getColumns();
    return (
        <>
            <DataTable
                data={beacons}
                loading={false}
                columns={columns}
                pagination={INITIAL_PAGINATION}
                totalRecords={beacons.length}
                onPaginationChange={(pagination) => {
                    console.log('Pagination changed:', pagination);
                }}
            />
        </>
    );
};

export default BeaconPage;
