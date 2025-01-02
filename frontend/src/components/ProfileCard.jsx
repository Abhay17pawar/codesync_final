import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// Data for Platforms and Social Links
const userhandles = localStorage.getItem('userleetcode');
const userhandles2 = localStorage.getItem('userCodeforces');
const userhandles3 = localStorage.getItem('usercodechef');

const platforms = [

  { name: 'Codeforces', icon: 'https://i.pinimg.com/736x/b4/6e/54/b46e546a3ee4d410f961e81d4a8cae0f.jpg', href: `https://codeforces.com/profile/${userhandles2}` },
  { name: 'LeetCode', icon: 'https://coderaky.com/images/icons/leetcode.png', href: `https://leetcode.com/${userhandles}` },
  { name: 'CodeChef', icon: 'https://jobs4fresher.com/wp-content/uploads/2020/03/codechef.png', href: `https://codechef.com/users/${userhandles3}` },
];

const socialLinks = [
  { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/abhay-pawar-b51174288/', label: 'LinkedIn' },
  { Icon: FaEnvelope, href: 'mailto:example@email.com', label: 'Email' },
];

// ProfileAvatar Component
function ProfileAvatar({ userData }) {
  const avatarContent = userData.avatar ? (
    <img
      src={userData.avatar}
      alt={userData.name || 'User Avatar'}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <span className="text-4xl font-bold text-gray-600">
        {userData.name ? userData.name.charAt(0) : '?' /* Fallback for missing name */}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-60 h-60 mb-8 ml-15"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse" />
      <div className="absolute inset-1 bg-gray-900 rounded-full">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-800">
          {avatarContent}
        </div>
      </div>
    </motion.div>
  );
}

// PlatformButton Component
function PlatformButton({ platform }) {
  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full mb-3 px-4 py-3 flex items-center bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors duration-300"
    >
      <img src={platform.icon} alt={platform.name} className="w-8 h-8 mr-3" />
      <span className="text-gray-200 font-medium">{platform.name}</span>
    </motion.a>
  );
}

// SocialLinks Component
function SocialLinks() {
  return (
    <div className="flex gap-4 mt-6">
      {socialLinks.map(({ Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          <Icon className="w-6 h-6" />
          <span className="sr-only">{label}</span>
        </motion.a>
      ))}
    </div>
  );
}

// Main ProfileCard Component
export default function ProfileCard() {
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem('userName');
  // Fetch User Data from API
  useEffect(() => {
    const fetchUserData = async () => {
      const userhandle = localStorage.getItem('userleetcode');
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${userhandle}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Loading State
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm ml-8 mt-8"
    >
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-5">
          <div className="flex flex-col items-center">
            {/* Avatar Section */}
            <ProfileAvatar userData={userData} />

            {/* User Info */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-5 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
            >
              {username}
            </motion.h2>
            
            {/* Platforms List */}
            <div className="w-full space-y-2">
              {platforms.map((platform) => (
                <PlatformButton key={platform.name} platform={platform} />
              ))}
            </div>

            {/* Social Links Section */}
            <SocialLinks />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
