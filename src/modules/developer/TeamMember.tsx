"use client"

import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, ExternalLink } from 'lucide-react';

export interface TeamMemberType {
    id: number;
    name: string;
    role: string;
    image: string;
    description: string;
    social: {
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
    website?: string;
  }

export default function TeamMember ({ member }: { member: TeamMemberType}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group overflow-hidden rounded-lg bg-gray-900/50 border border-white/5
                transform transition-all duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative z-10 h-96 overflow-hidden text-gray-400
        ${isHovered ? 'translate-y-[-60px] text-white' : ''}
        transition-all duration-500 ease-out
      `}>
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
        />
        
        {/* Minimal overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Name section */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="relative">
            <h3 className=" text-2xl font-display tracking-wide mb-1">
              {member.name}
            </h3>
            <p className="text-[#1DD8AC]/70 text-sm font-semibold uppercase tracking-widest">{member.role}</p>
            <div className="h-px w-12 bg-white/20 mt-3"></div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className={`
        absolute left-0 right-0 bottom-0 p-6 bg-gray-900/95
        transition-all duration-500 ease-out
        ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-10'}
      `}>
        <p className="text-white/80 mb-4 text-sm leading-relaxed">{member.description}</p>
        
        <div className="flex space-x-4">
          {member.social.instagram && (
            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" 
               className="text-white/50 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
               className="text-white/50 hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
          )}
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
               className="text-white/50 hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {member.website && (
            <a href={member.website} target="_blank" rel="noopener noreferrer"
               className="text-white/50 hover:text-white transition-colors">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};