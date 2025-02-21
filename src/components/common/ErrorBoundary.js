import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // You can also log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Oops! Something went wrong
                </h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    We're sorry for the inconvenience. Please try again or contact support if the problem persists.
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  <Button
                    variant="primary"
                    onClick={this.handleRetry}
                    fullWidth
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => window.location.reload()}
                    fullWidth
                  >
                    Refresh Page
                  </Button>
                </div>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mt-6 text-left">
                    <p className="text-sm font-medium text-red-800">Error Details:</p>
                    <pre className="mt-2 text-xs text-red-600 bg-red-50 p-4 rounded-md overflow-auto">
                      {this.state.error.toString()}
                      {"\n\n"}
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;