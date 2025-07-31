import { getLogsStats } from '@/apis/dashboard';
import Button from '@/components/common/Button';
import NotificationCard from '@/pages/dashboard/activity-logs/notification-card/notification-card';
import { useQuery } from '@tanstack/react-query';

const ActivityLogs = () => {
  const { data: logs } = useQuery({
    queryKey: ['activity-logs'],
    queryFn: getLogsStats,
    refetchInterval: 30000,
  });
  return (
    <>
      <div className="sticky top-0 z-10 mt-10 flex items-center justify-between bg-[#F9FAFB]">
        <h3 className="text-2xl font-bold">Activity</h3>
        <Button variant="link" disabled>
          View All
        </Button>
      </div>
      {logs?.results.map((log, index) => (
        <NotificationCard
          campaign={log.campaign}
          deviceId={log.device_id}
          log={log.log}
          logType={log.log_type}
          modified={log.modified}
          key={index}
        />
      ))}
    </>
  );
};

export default ActivityLogs;
