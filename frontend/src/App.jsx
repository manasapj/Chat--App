import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="size-12 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300"
          >
            Preparing your workspace...
          </motion.span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div 
      data-theme={theme}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="fixed inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(at 10% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
            'radial-gradient(at 90% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(at 50% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            'radial-gradient(at 10% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <Navbar />
      </motion.header>
      
      {/* Main content with entrance animation */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* Footer with subtle animation */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="container mx-auto px-4">
          <motion.p
            whileHover={{ scale: 1.02 }}
            className="inline-block"
          >
            © {new Date().getFullYear()} ChatApp — Connect effortlessly
          </motion.p>
          {authUser && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mt-2 flex items-center justify-center space-x-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block w-2 h-2 rounded-full bg-emerald-500"
              />
              <span>{onlineUsers.length} {onlineUsers.length === 1 ? 'person' : 'people'} online</span>
            </motion.div>
          )}
        </div>
      </motion.footer>

      {/* Enhanced Toaster with animations */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '!bg-white !text-gray-800 dark:!bg-gray-800 dark:!text-gray-200 !shadow-xl !rounded-xl !border !border-gray-200 dark:!border-gray-700',
          duration: 4000,
        }}
      >
        {(t) => (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t.message}
          </motion.div>
        )}
      </Toaster>
    </div>
  );
};

export default App;