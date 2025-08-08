import React from "react";
import { motion } from "framer-motion";

const Loading = ({ className }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse" />
        </div>
      </div>

      {/* Quick Add Skeleton */}
      <div className="h-14 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border-2 border-dashed border-gray-200 animate-pulse" />

      {/* Task Items Skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div 
                  className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                  style={{ width: `${60 + Math.random() * 40}%` }}
                />
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;