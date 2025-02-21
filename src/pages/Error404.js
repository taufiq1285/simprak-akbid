import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-900">
              Page Not Found
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              fullWidth
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              fullWidth
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;