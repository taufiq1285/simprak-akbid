import React, { useState } from 'react';
import { Lock, Key, Shield, Smartphone } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';

const SecuritySettings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      setIsPasswordModalOpen(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Sessions */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Active Sessions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  iPhone 12 - Safari
                </p>
                <p className="text-xs text-gray-500">
                  Last active: 2 minutes ago
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
            >
              Logout
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Windows 10 - Chrome
                </p>
                <p className="text-xs text-gray-500">
                  Last active: Current session
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant="secondary"
            fullWidth
          >
            Logout from all devices
          </Button>
        </div>
      </Card>

      {/* Security Options */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Security Options
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Password
                </p>
                <p className="text-xs text-gray-500">
                  Last changed 30 days ago
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500">
                  Not enabled
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIs2FAModalOpen(true)}
            >
              Setup
            </Button>
          </div>
        </div>
      </Card>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm(prev => ({
              ...prev,
              currentPassword: e.target.value
            }))}
            icon={Key}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm(prev => ({
              ...prev,
              newPassword: e.target.value
            }))}
            icon={Lock}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm(prev => ({
              ...prev,
              confirmPassword: e.target.value
            }))}
            icon={Lock}
            required
          />

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2FA Setup Modal */}
      <Modal
        isOpen={is2FAModalOpen}
        onClose={() => setIs2FAModalOpen(false)}
        title="Setup Two-Factor Authentication"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Two-factor authentication adds an extra layer of security to your account.
          </p>
          {/* Add 2FA setup content here */}
        </div>
      </Modal>
    </div>
  );
};

export default SecuritySettings;