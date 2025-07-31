import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  deviceId: string;
  logType: string;
  log: string;
  campaign: number;
  modified: string;
};
const NotificationCard: React.FC<Props> = ({ campaign, deviceId, log, logType, modified }) => {
  return (
    <div className="flex items-start justify-between rounded-xl py-4 hover:bg-gray-200">
      {/* Left: Avatar + Info */}
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src="" alt="Log" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>

        <div className="text-sm">
          <p className="font-semibold">{logType}</p>
          <p className="text-muted-foreground">
            {log}
            <span className="font-medium text-emerald-600">On</span>
          </p>
          <p className="font-semibold text-emerald-700">Device No {deviceId}</p>
          <p className="font-semibold text-emerald-700">Campaign ID {campaign}</p>
        </div>
      </div>

      {/* Right: Timestamp */}
      <div className="text-xs text-muted-foreground">
        {modified ? new Date(modified).toISOString().slice(0, 10) : 'N/A'}
      </div>
    </div>
  );
};

export default NotificationCard;
