import { IconType } from 'react-icons';
import { FaDiscord, FaGithub, FaGoogle } from 'react-icons/fa6';

type Provider = string;

const providerData: Record<Provider, { icon: IconType; color: string; label: string }> = {
    google: {
        icon: FaGoogle,
        color: '#DB4437',
        label: 'Google',
    },
    github: {
        icon: FaGithub,
        color: '#333',
        label: 'GitHub',
    },
    discord: {
        icon: FaDiscord,
        color: '#7289DA',
        label: 'Discord',
    },
};

export const AuthProviderBadge = ({ provider }: { provider: Provider }) => {
    const data = providerData[provider];

    return (
        <div className="flex items-center px-2 py-1 rounded-lg space-x-2 font-semibold" style={{ backgroundColor: data.color }}>
            <data.icon />
            <span className="text-white">{data.label}</span>
        </div>
    );
};
