import React from 'react'
import { FacebookSvg, InstagramSvg, LinkedInSvg } from '../public/images/SVG/svg';

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 p-10 lg:px-16 md:pt-12">
        <div className="container mx-auto flex flex-wrap justify-between items-start px-4 md:px-8">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold text-white mb-3">About CareerExalt</h3>
            <p className="text-gray-400">
              CareerExalt is more than just a job board; it is a thriving ecosystem where talent meets opportunity. 
              Navigate through a multitude of vacancies and elevate your career with us!
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook">
                <FacebookSvg />
              </a>
              <a href="#" aria-label="Instagram" >
                <InstagramSvg />
              </a>
              <a href="#" aria-label="LinkedIn">
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
  
        <div className="border-t border-gray-700 mt-8 pt-4 text-gray-400">
          <p>Copyright &copy; 2024 CareerExalt</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  