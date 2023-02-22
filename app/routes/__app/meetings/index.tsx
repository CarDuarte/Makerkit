import AppHeader from '~/components/AppHeader';
import AppContainer from '~/components/AppContainer';
import ClientOnly from '~/core/ui/ClientOnly';
import Heading from '~/core/ui/Heading';
import { Trans } from 'react-i18next';
import CreateMeetingForm from '~/components/meetings/CreateMeetingForm';
import ListMeetings from '~/components/meetings/ListMeeting';

function MeetingsPage() {
  return (
    <>
      <AppHeader>
        <Trans i18nKey={'common:meetingsTabLabel'} />
      </AppHeader>
      <ClientOnly>
        <AppContainer>
          <div className={'flex flex-col space-y-6 pb-36'}>
            <Heading type={3}>
            <Trans i18nKey={'meeting:meetingsInstructions'} />
            </Heading>
            <CreateMeetingForm/>
            <ListMeetings/>
          </div>
        </AppContainer>
      </ClientOnly>
    </>
  );
}

export default MeetingsPage;