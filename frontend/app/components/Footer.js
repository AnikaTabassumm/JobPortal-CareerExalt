import React from 'react'
import { FacebookSvg, InstagramSvg, LinkedInSvg } from '../public/images/SVG/svg';

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 p-10">
        <div className="container mx-auto flex flex-wrap justify-between items-start px-4 md:px-8">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold text-white mb-3">About Career Bridge</h3>
            <p className="text-gray-400">
              Career Bridge is more than just a job board; it is a thriving ecosystem where talent meets opportunity. 
              Navigate through a multitude of vacancies and elevate your career with us!
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                  <path d="M22.67 0H1.33A1.34 1.34 0 000 1.33v21.34A1.34 1.34 0 001.33 24h11.48v-9.31H9.59v-3.62h3.22V8.41c0-3.2 1.93-4.95 4.75-4.95 1.35 0 2.5.1 2.84.14v3.3h-1.95c-1.53 0-1.83.73-1.83 1.79v2.35h3.66l-.48 3.62h-3.18V24h6.25A1.34 1.34 0 0024 22.67V1.33A1.34 1.34 0 0022.67 0z"/>
                </svg> */}
                <FacebookSvg />
              </a>
              <a href="#" aria-label="Instagram" >
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                  <path d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.06 1.92.25 2.36.42.5.19.85.42 1.22.8.38.37.61.72.8 1.22.17.44.36 1.19.42 2.36.07 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.06 1.17-.25 1.92-.42 2.36-.19.5-.42.85-.8 1.22-.37.38-.72.61-1.22.8-.44.17-1.19.36-2.36.42-1.27.07-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.06-1.92-.25-2.36-.42-.5-.19-.85-.42-1.22-.8-.38-.37-.61-.72-.8-1.22-.17-.44-.36-1.19-.42-2.36-.07-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85c.06-1.17.25-1.92.42-2.36.19-.5.42-.85.8-1.22.37-.38.72-.61 1.22-.8.44-.17 1.19-.36 2.36-.42C8.42 2.16 8.8 2.16 12 2.16zm0-2.16C8.72 0 8.29 0 7.01.07 5.69.14 4.73.31 4 .55 3.26.8 2.66 1.18 2.09 1.75c-.57.57-.95 1.17-1.2 1.91-.24.73-.41 1.69-.48 3.01C0 8.29 0 8.72 0 12s0 3.71.07 4.99c.07 1.32.24 2.28.48 3.01.25.74.63 1.34 1.2 1.91.57.57 1.17.95 1.91 1.2.73.24 1.69.41 3.01.48 1.28.07 1.71.07 4.99.07s3.71 0 4.99-.07c1.32-.07 2.28-.24 3.01-.48.74-.25 1.34-.63 1.91-1.2.57-.57.95-1.17 1.2-1.91.24-.73.41-1.69.48-3.01.07-1.28.07-1.71.07-4.99s0-3.71-.07-4.99c-.07-1.32-.24-2.28-.48-3.01-.25-.74-.63-1.34-1.2-1.91-.57-.57-1.17-.95-1.91-1.2-.73-.24-1.69-.41-3.01-.48C15.28 0 14.85 0 12 0z"/>
                  <path d="M12 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.41-11.58a1.44 1.44 0 11-2.87 0 1.44 1.44 0 012.87 0z"/>
                </svg> */}
                <InstagramSvg />
              </a>
              <a href="#" aria-label="LinkedIn">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                  <path d="M4.98 3.5C4.98 2.12 5.93 1 7.5 1S10 2.12 10 3.5C10 4.88 9.05 6 7.5 6S4.98 4.88 4.98 3.5zM0 24V8h5v16H0zm7.26-16H7.2v16h5V13.46c0-2.5 1.28-4.08 3.76-4.08 2.15 0 3.18 1.63 3.18 4.08V24h5V13.12C24 7.58 21.14 5 17.09 5c-3.61 0-5.33 1.79-5.88 3.04V8H7.26v16H7.26z"/>
                </svg> */}
                <LinkedInSvg />
              </a>
            </div>
          </div>
  
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <h3 className="text-lg font-bold text-white mb-3">For Candidates</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Companies</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Job Categories</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Jobs</a></li>
            </ul>
          </div>
  
          <div className="w-full md:w-1/6 mb-6 md:mb-0">
            <h3 className="text-lg font-bold text-white mb-3">For Employers</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Companies</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Dashboard</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Post Jobs</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Resumes</a></li>
            </ul>
          </div>
  
          <div className="w-full md:w-1/6">
            <h3 className="text-lg font-bold text-white mb-3">Other Links</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>Copyright © 2024 CareerBridge</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  