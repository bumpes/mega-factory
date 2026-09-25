import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { path: '/', label: '工作台', icon: '▣' },
  { path: '/creations', label: '创意库', icon: '✦' },
  { path: '/task', label: '生成任务', icon: '▶' },
  { path: '/gallery', label: '作品库', icon: '🖼' },
  { path: '/compare', label: '比较工作台', icon: '⇄' },
  { path: '/reference', label: '参考图库', icon: '📁' },
  { path: '/settings', label: '设置', icon: '⚙' },
];

const mobileNavItems = [
  { path: '/', label: '工作台', icon: '▣' },
  { path: '/creations', label: '创意库', icon: '✦' },
  { path: '/task', label: '生成', icon: '▶' },
  { path: '/gallery', label: '作品库', icon: '🖼' },
  { path: '/settings', label: '我的', icon: '⚙' },
];

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-800 border-r border-gray-700">
        <div className="flex items-center h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">巨构工厂</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between h-14 px-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-lg font-bold">巨构工厂</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          ☰
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900 pt-14">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 px-2 text-xs ${
                  isActive ? 'text-blue-400' : 'text-gray-400'
                }`
              }
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
