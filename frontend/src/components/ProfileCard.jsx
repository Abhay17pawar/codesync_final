import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// Data
const platforms = [
  {
    name: 'Codeforces',
    icon: 'https://i.pinimg.com/736x/b4/6e/54/b46e546a3ee4d410f961e81d4a8cae0f.jpg',
    href: 'https://codeforces.com',
  },
  {
    name: 'LeetCode',
    icon: 'https://coderaky.com/images/icons/leetcode.png',
    href: 'https://leetcode.com',
  },
  {
    name: 'CodeChef',
    icon: 'https://jobs4fresher.com/wp-content/uploads/2020/03/codechef.png',
    href: 'https://codechef.com',
  },
];

const socialLinks = [
  { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: FaEnvelope, href: 'mailto:example@email.com', label: 'Email' },
];

// Sub-components
function ProfileAvatar({ imageUrl, name }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-60 h-60 mb-8 ml-15 "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse" />
      <div className="absolute inset-1 bg-gray-900 rounded-full">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-800">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <span className="text-4xl font-bold text-gray-600">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PlatformButton({ icon, name, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full mb-3 px-4 py-3 flex items-center bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors duration-300"
    >
      <img
        src={icon}
        alt={name}
        className="w-8 h-8 mr-3"
      />
      <span className="text-gray-200 font-medium">{name}</span>
    </motion.a>
  );
}

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

// Main component
export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm ml-8 mt-8"
    >
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          <div className="flex flex-col items-center">
            <ProfileAvatar
              imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400"
              name="John Developer"
            />
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
            >
              John Developer
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mb-6"
            >
              Senior Software Engineer
            </motion.p>

            <div className="w-full space-y-2">
              {platforms.map((platform) => (
                <PlatformButton
                  key={platform.name}
                  icon={platform.icon}
                  name={platform.name}
                  href={platform.href}
                />
              ))}
            </div>

            <SocialLinks />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
