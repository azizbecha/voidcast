import moment from "moment";

import { withHttp } from "@/utils/withUrl";

import { FaBirthdayCake } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

import { UserProfile } from "@/interfaces";

export const About: React.FC<{ profile: UserProfile }> = ({ profile }) => (
    <div>
        <h4>About {profile?.full_name}</h4>
        <p className="text-white text-sm my-2">{profile?.bio}</p>

        {profile?.url && (
            <div className="flex flex-start">
                <a href={withHttp(profile.url)} target="_blank" rel="noopener noreferrer" className="text-accent font-bold flex items-center gap-1 mb-2">
                    <FaLink /> {profile.url}
                </a>
            </div>
        )}

        {profile?.verified && (
            <p className="text-primary-300 flex flex-row items-center justify-start gap-1"><MdVerified /> Verified user</p>
        )}
        <p className="text-primary-300 flex flex-row items-center justify-start gap-1"><FaBirthdayCake /> Member since {moment(profile?.created_at).format("DD MMMM YYYY")}</p>
    </div>
);