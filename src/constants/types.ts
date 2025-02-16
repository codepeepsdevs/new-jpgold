import { StaticImageData } from "next/image";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMemberProps {
  name: string;
  position: string;
  linkedin: string;
  image: string | StaticImageData;
  about: string;
}
