import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Lock,
  Camera
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthdate: user?.birthdate || '',
    avatar: user?.avatar || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(profileData);
      showSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      showError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

      {/* Profile Header */}
      <Card>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-full w-full p-4 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <Camera className="h-4 w-4 text-gray-600" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEditing}
              icon={User}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
              icon={Mail}
            />

            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              icon={Phone}
            />

            <Input
              label="Birth Date"
              type="date"
              name="birthdate"
              value={profileData.birthdate}
              onChange={handleChange}
              disabled={!isEditing}
              icon={Calendar}
            />
          </div>

          <div className="flex justify-end space-x-3">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Security Settings */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={() => {/* Handle password change */}}
          >
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;