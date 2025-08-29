import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              404
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Page Not Found
            </CardDescription>
            <p className="text-gray-500">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate('/')} 
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500 mb-3">
                Try these helpful links:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/about')}
                  className="flex-1"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  About
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="flex-1"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
