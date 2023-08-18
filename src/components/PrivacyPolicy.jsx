import React from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { MdSecurity } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import '../stylesheets/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-content">
        <div className="privacy-title">
          <MdSecurity /> Privacy Policy
        </div>
        <div className="privacy-text">
          <p>
            At MyBlog, we take your privacy seriously. We use advanced encryption and security measures to protect your data.
          </p>
          <p>
            <AiOutlineLock /> Your passwords are hashed and stored securely, ensuring they remain private and confidential.
          </p>
          <p>
            <RiLockPasswordLine /> All communication between your device and our servers is encrypted to prevent unauthorized access.
          </p>
          <p>
            We do not share your personal information with third parties. Your data is safe and protected with us.
          </p>
          <p>
            By using MyBlog, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
