import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Book, 
  GraduationCap,
  Settings,
  User,
  Users,
  FileText,
  Calendar,
  LogOut,
  FlaskConical
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Calendar, label: 'Jadwal', path: '/jadwal' },
    ];

    const roleSpecificItems = {
      admin: [
        { icon: Users, label: 'Manajemen User', path: '/users' },
        { icon: Book, label: 'Manajemen Praktikum', path: '/praktikum-manage' },
        { icon: FlaskConical, label: 'Laboratorium', path: '/laboratorium' }
      ],
      dosen: [
        { icon: Book, label: 'Praktikum', path: '/praktikum' },
        { icon: FileText, label: 'Penilaian', path: '/penilaian' },
      ],
      mahasiswa: [
        { icon: Book, label: 'Praktikum', path: '/praktikum' },
        { icon: GraduationCap, label: 'Nilai', path: '/nilai' },
      ],
    };

    const settingsItem = [
      { icon: User, label: 'Profile', path: '/profile' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return [
      ...commonItems,
      ...(roleSpecificItems[user?.role] || []),
      ...settingsItem
    ];
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={`
        fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        {!isCollapsed && <span className="text-xl font-bold">SimPrak</span>}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {getMenuItems().map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`
              flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors
              ${isActiveRoute(item.path) ? 'bg-gray-800 text-white' : ''}
            `}
          >
            <item.icon size={20} />
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
