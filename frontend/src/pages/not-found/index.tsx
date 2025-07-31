import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // optional if using shadcn/ui

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <p className="m-2 text-sm text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>
  );
};

export default NotFound;
