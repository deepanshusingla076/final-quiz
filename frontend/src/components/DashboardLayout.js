import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="dashboard-layout">
      <Navigation />
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          {children}
        </div>
      </main>

      {/* Floating Action Button for Quick Quiz Creation (Teachers) */}
      {user && user.role === 'TEACHER' && (
        <motion.a
          href="/quiz/create"
          className="fab"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <i className="fas fa-plus"></i>
        </motion.a>
      )}
    </div>
  );
};

export default DashboardLayout;