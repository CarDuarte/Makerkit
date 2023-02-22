import React, { useContext } from 'react';
import OrganizationContext from '~/lib/contexts/organization';
import useListMeetings from '~/lib/meetings/hooks/use-list-meetings';
import Tile from '~/core/ui/Tile';
import If from '~/core/ui/If';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import Alert from '~/core/ui/Alert';
import { Trans } from 'react-i18next';
import formatDistance from 'date-fns/formatDistance';
import DeleteMeetingButton from './DeleteMeetingButton';
import UpdateMeetingButton from './UpdateMeetingButton';

const ListMeetings: React.FC<{}> = () => {
  const { organization } = useContext(OrganizationContext);
  const {
    data: meetings,
    status,
    error,
  } = useListMeetings(organization?.id as string);

  if (status === 'loading') {
    return <SubHeading>Loading ... </SubHeading>;
  }

  if (status === 'error') {
    return (
      <Alert type={'error'}>
        <Trans i18nKey={'meeting:loadmeetingsError'} />
        <span>{error?.message}</span>
      </Alert>
    );
  }

  return (
    <div
      className={
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3' +
        ' xl:grid-cols-4'
      }
    >
      <If condition={status === 'success'}>
        {meetings.map((meeting) => {
          return (
            <Tile key={meeting.id}>
              <Heading type={4}>
                <div className={'flex justify-center text-center '}>
                  <span>{meeting.meetingText}</span>
                </div>
              </Heading>
              <Tile.Body>
                <div className="flex justify-around">
                  <div className="flex-initial">
                    <UpdateMeetingButton meeting={meeting} />
                  </div>
                  <div className="flex-initial">
                    <DeleteMeetingButton meetingId={meeting.id as string} />
                  </div>
                </div>
              </Tile.Body>
            </Tile>
          );
        })}
      </If>
    </div>
  );
};

export default ListMeetings;
