import {
  Camera,
  Clapperboard,
  Headphones,
  Image as ImageIcon,
  Lightbulb,
  Monitor,
  Radio,
  Speaker,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const base = "https://www.ebenezerstreaminghouse.com/services";

export const services: Service[] = [
  {
    title: "Live Event Streaming",
    description:
      "Broadcast your events to a global audience with crystal-clear HD streaming. Multi-camera setups, graphics, and real-time production.",
    href: `${base}/live-event-streaming`,
    icon: Radio,
  },
  {
    title: "Podcast Production",
    description:
      "Full-service podcast recording and production. Professional audio quality, editing, and post-production for engaging content.",
    href: `${base}/podcast-production`,
    icon: Headphones,
  },
  {
    title: "Video & Audio Production",
    description:
      "High-quality video and audio content creation. Commercials, promotional videos, music production, and voice-overs.",
    href: `${base}/video-audio-production`,
    icon: Video,
  },
  {
    title: "Documentary Production",
    description:
      "Compelling documentary storytelling with cinematic visuals. Research, filming, interviews, and complete post-production.",
    href: `${base}/documentary-production`,
    icon: Clapperboard,
  },
  {
    title: "Event Coverage",
    description:
      "Comprehensive media coverage for conferences, weddings, church events, and corporate gatherings. Photos, videos, and live streams.",
    href: `${base}/event-coverage`,
    icon: Camera,
  },
  {
    title: "Technical Support",
    description:
      "Media setup, equipment rental, and technical consultation. Ensure your production runs smoothly with our expert support.",
    href: `${base}/technical-support`,
    icon: Wrench,
  },
  {
    title: "Sound System",
    description:
      "Professional sound system setup and rental for events, conferences, and performances. Crystal-clear audio that fills any venue.",
    href: `${base}/sound-system`,
    icon: Speaker,
  },
  {
    title: "LED Screen",
    description:
      "High-resolution LED screen rental for events, stages, and venues. Stunning visuals that captivate your audience.",
    href: `${base}/led-screen`,
    icon: Monitor,
  },
  {
    title: "Photographs",
    description:
      "Professional photography services for portraits, events, branding, and product shoots. High-quality images that tell your story.",
    href: `${base}/photoshoot`,
    icon: ImageIcon,
  },
  {
    title: "Lighting",
    description:
      "Professional lighting setup for events, studios, film shoots, and stage productions. Create the perfect atmosphere with expert illumination.",
    href: `${base}/lighting`,
    icon: Lightbulb,
  },
];

export const stats = [
  { value: "200+", label: "Happy Clients" },
  { value: "450+", label: "Projects Completed" },
  { value: "180+", label: "Events Covered" },
  { value: "98%", label: "Satisfaction Rate" },
];

export type Testimonial = {
  service: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  initial: string;
};

export const testimonials: Testimonial[] = [
  {
    service: "Live Streaming",
    quote:
      "Ebenezer Streaming House transformed our Sunday services. Their professional live streaming setup has helped us reach our congregation members across Rwanda and beyond. Truly exceptional service!",
    name: "Pastor Jean Baptiste Mugabo",
    role: "Senior Pastor, Light of Hope Church",
    rating: 5,
    initial: "P",
  },
  {
    service: "Event Coverage",
    quote:
      "We've partnered with Ebenezer for multiple corporate conferences. Their attention to detail, reliable equipment, and professional team make every event a success. Highly recommended!",
    name: "Marie Claire Uwimana",
    role: "Events Director, Kigali Convention Centre",
    rating: 5,
    initial: "M",
  },
  {
    service: "Documentary",
    quote:
      "The documentary they produced for our organization exceeded all expectations. Their storytelling ability and technical expertise are world-class. A true asset to Rwanda's media industry.",
    name: "Emmanuel Habimana",
    role: "CEO, Rwanda Business Network",
    rating: 5,
    initial: "E",
  },
  {
    service: "Video Production",
    quote:
      "Every wedding we've collaborated on with Ebenezer Streaming House has been beautifully captured. They understand the importance of those special moments and deliver stunning coverage.",
    name: "Diane Mukamana",
    role: "Wedding Planner, Elegant Events Rwanda",
    rating: 5,
    initial: "D",
  },
  {
    service: "Podcast Production",
    quote:
      "Professional, creative, and incredibly reliable. My podcast production quality improved dramatically since working with Ebenezer. They truly understand content creation.",
    name: "Patrick Nshimiyimana",
    role: "Podcast Host, Tech Talk Rwanda",
    rating: 5,
    initial: "P",
  },
  {
    service: "Media Production",
    quote:
      "From concept to final delivery, Ebenezer Streaming House exceeded our expectations. Their media production services have helped us amplify our message across East Africa.",
    name: "Jeannette Ingabire",
    role: "Communications Manager, Rwanda NGO Forum",
    rating: 5,
    initial: "J",
  },
];
