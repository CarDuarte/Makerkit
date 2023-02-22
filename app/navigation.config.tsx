import configuration from '~/configuration';
import {
  Cog8ToothIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

const NAVIGATION_CONFIG = {
  items: [
    {
      label: 'common:dashboardTabLabel',
      path: configuration.paths.appHome,
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
    },
    {
      label: 'common:settingsTabLabel',
      path: configuration.paths.settings.profile,
      Icon: ({ className }: { className: string }) => {
        return <Cog8ToothIcon className={className} />;
      },
    },
    {
      label: 'common:postsTabLabel',
      path: configuration.paths.posts,
      Icon: ({ className }: { className: string }) => {
        return <DocumentTextIcon className={className} />;
      },
    },
    {
      label: 'common:meetingsTabLabel',
      path: configuration.paths.meetings,
      Icon: ({ className }: { className: string }) => {
        return <ChatBubbleLeftIcon className={className} />;
      },
    },
  ],
};

export default NAVIGATION_CONFIG;
