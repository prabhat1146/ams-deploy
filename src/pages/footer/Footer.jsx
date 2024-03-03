import React from 'react';
import { useSpring, animated } from 'react-spring';

const Footer = () => {
  const fadeInAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.footer style={fadeInAnimation} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
        {/* Left column */}
        <div className="col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">IIITG Attendance System</h2>
            <p><strong>Guide:</strong> Dr. Angshuman Jana</p>
            <p><strong>MailID:</strong> angshuman@iiitg.ac.in</p>
            <p><strong>Developed By:</strong> @Prabhat</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <p><strong>Website:</strong> www.iiitg.ac.in</p>
            <p><strong>Phone:</strong> +91-08242474000</p>
            <p><strong>Email:</strong> feedback.ug@iiitg.ac.in</p>
            <p>
              <strong>Address:</strong> Indian Institute of Information Technology Guwahati<br />
              Bongora, Assam<br />
              Guwahati - 781015<br />
              India
            </p>
          </div>
        </div>

        {/* Right column */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Social Links</h2>
          {/* Add your social links here */}
          <div >
            <a href="https://www.facebook.com/iiitghy/"><img src="/images/facebook-logo.png" alt="" 
            className='flex ml-2 w-14 h-14'
            /></a>
          </div>
          <div >
            <a href="https://www.instagram.com/iiit.guwahati/"><img src="/images/instagram.webp" alt="" 
            className='fkex w-20 h-20'
            /></a>
          </div>
          <div >
            <a href="https://twitter.com/iiitghy?lang=en"><img src="/images/twitter.webp" alt="" 
            className='fkex w-20 h-20 rounded-full'
            /></a>
          </div>
          <div >
            <a href="https://www.iiitg.ac.in/"><img src="/images/iiitg.png" alt="" 
            className='fkex w-14 h-14 ml-2 rounded-full bg-white'
            /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <p className="text-sm">
          &copy; 2024 IIITG-Attendance-System. All rights reserved. | Designed by prabhat.kumar21b
        </p>
        <hr />
      </div>
      <p className="text-xs mt-3 text-center">The project is under development.</p>
    </animated.footer>
  );
};

export default Footer;
