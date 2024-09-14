export interface Clip {
  id: string;
  title: string;
  description: string;
  audiofile: string;
  creator: string;
  created_at: string;
  plays: number 
}

interface CustomClaims {
  global_name: string;
}

export interface UserMetadata {
  iss: string;
  sub: string;
  name: string;
  email: string;
  picture: string;
  full_name: string;
  user_name: string;
  avatar_url: string;
  provider_id: string;
  custom_claims: CustomClaims;
  email_verified: boolean;
  phone_verified: boolean;
  preferred_username: string;
}

export interface AppMetadata {
  provider: string,
  providers:  string[]
}
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  user_metadata: UserMetadata;
  app_metadata: AppMetadata;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  username: string;
  avatar: string;
  verified: boolean;
}