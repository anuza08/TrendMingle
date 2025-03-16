import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-roboto">About Us</h3>
          <p className="text-white font-roboto font-light text-sm leading-6">
            We provide top-notch services and innovative solutions to make your
            life easier. Stay connected with us for the latest updates.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-roboto">Support</h3>
          <p className="text-white font-roboto font-light text-sm">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="text-white font-roboto font-light text-sm">
            exclusive@gmail.com
          </p>
          <p className="text-white font-roboto font-light text-sm">
            +88015-88888-9999
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-roboto">Quick Links</h3>
          <ul className="text-white font-roboto font-light space-y-2">
            <li>Home</li>
            <li>Services</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-roboto">Follow Us</h3>
          <div className="flex gap-6 text-gray-400">
            <FaFacebookF className="cursor-pointer hover:text-blue-500 w-5 h-5" />
            <FaTwitter className="cursor-pointer hover:text-blue-400 w-5 h-5" />
            <FaInstagram className="cursor-pointer hover:text-pink-500 w-5 h-5" />
            <FaLinkedinIn className="cursor-pointer hover:text-blue-700 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-12 border-t border-gray-700 pt-8">
        &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
