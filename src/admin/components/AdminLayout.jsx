// src/admin/components/AdminLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const LOGO = "../../public/icons8-portfolio-48.png";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  // fetch current user (/auth/me) to determine admin privileges
  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE || ""}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          // not signed in / not admin — treat as guest
          setUser(null);
          return;
        }
        const data = await res.json();
        if (!cancelled) setUser(data || null);
      } catch (err) {
        console.error("Failed to fetch /auth/me:", err);
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  async function logout() {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE || ""}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.warn("Logout failed:", e);
    } finally {
      navigate("/login");
    }
  }

  // helper to mark active link
  function isActive(path) {
    return location.pathname === path;
  }

  // small nav item component
  const NavItem = ({ to, children, show = true }) =>
    show ? (
      <Link
        to={to}
        className={`text-white hover:bg-white cursor-pointer hover:border hover:border-green-500 hover:text-green-500 transition-all duration-500 px-3 py-2 rounded-md text-sm font-medium ${
          isActive(to) ? "bg-white text-green-400 border border-green-500" : "text-jet-black"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        {children}
      </Link>
    ) : null;

  // while determining auth, show full-screen loader for admin area
  if (loading) return <Loading fullscreen text="Checking session..." />;

  return (
    <div className="min-h-screen bg-green-100 text-gray-900">
      <header className="bg-jet-black text-platinum-white shadow-sm">
        <div className="max-w-6xl mx-auto bg-black flex items-center gap-4 p-3 md:p-4">
          {/* left: logo */}
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-3">
              <img src={LOGO} alt="logo" className="w-10 h-10 rounded-md object-cover" />
              <span className="hidden sm:inline text-lg font-semibold tracking-wide">
                <span className="text-white">RA</span><span className="text-green-400">JAN</span>
              </span>
            </Link>
          </div>

          {/* center / desktop nav */}
          <nav className="hidden md:flex ml-6 items-center gap-2 ">
            <NavItem to="/admin" show={!!user && user.is_admin}>Dashboard</NavItem>
            <NavItem to="/admin/projects" show={true}>Projects</NavItem>
            <NavItem to="/admin/profile" show={true}>Profile</NavItem>
            <NavItem to="/admin/pending" show={!!user && user.is_admin}>Pending Approval</NavItem>
          </nav>

          {/* right: actions */}
          <div className="ml-auto flex items-center gap-3">
            {/* show user email or sign-in link */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 hover:bg-white/10"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <span className="text-sm text-white">{user.user?.name || user?.user?.email}</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="white" aria-hidden>
                    <path d="M5.23 7.21a.75.75 0 011.04.02L10 10.94l3.73-3.71a.75.75 0 111.06 1.06l-4.26 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                  </svg>
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg text-black z-40 overflow-hidden"
                    role="menu"
                    aria-label="User menu"
                  >
                    <div className="px-3 py-2 text-sm border-b">{user.email}</div>
                    <Link to="/admin/profile" className="block px-3 py-2 text-sm hover:bg-gray-100" onClick={() => setProfileOpen(false)}>
                      My profile
                    </Link>
                    {user.is_admin && (
                      <Link to="/admin/pending" className="text-white bg-black hover:bg-white cursor-pointer hover:border hover:border-green-500 hover:text-green-500 transition-all duration-500 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setProfileOpen(false)}>
                        Pending approvals
                      </Link>
                    )}
                    <button onClick={logout} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded bg-royal-blue text-white">Sign in</Link>
            )}

            {/* mobile menu button */}
            <button
              className="md:hidden px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="green" stroke="white">
                {mobileOpen ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-black border-t shadow-inner">
            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-2">
              <Link to="/admin" className={`text-white hover:bg-white transition-all duration-500 hover:text-green-400 hover:border-green-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${isActive("/admin") ? "bg-white text-green-400 border border-green-500" : "text-jet-black"}`} onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>

              <Link to="/admin/projects" className={`text-white hover:bg-white transition-all duration-500 hover:text-green-400 hover:border-green-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${isActive("/admin/projects") ? "bg-white text-green-400 border border-green-500" : "text-jet-black"}`} onClick={() => setMobileOpen(false)}>
                Projects
              </Link>

              <Link to="/admin/profile" className={`text-white hover:bg-white transition-all duration-500 hover:text-green-400 hover:border-green-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${isActive("/admin/profile") ? "bg-white text-green-400 border border-green-500" : "text-jet-black"}`} onClick={() => setMobileOpen(false)}>
                Profile
              </Link>

              {user && user.is_admin && (
                <Link to="/admin/pending" className={`text-white hover:bg-white transition-all duration-500 hover:text-green-400 hover:border-green-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${isActive("/admin/pending") ? "bg-white text-green-400 border border-green-500" : "text-jet-black"}`} onClick={() => setMobileOpen(false)}>
                  Pending Approval
                </Link>
              )}

              <div className="pt-2 border-t mt-2">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-700">{user.email}</div>
                    <button onClick={() => { setMobileOpen(false); logout(); }} className="w-full text-left px-3 py-2 text-sm text-red-600">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block px-3 py-2 text-sm text-royal-blue" onClick={() => setMobileOpen(false)}>
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
