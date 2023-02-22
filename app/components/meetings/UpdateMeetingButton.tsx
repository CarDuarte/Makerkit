import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import React, { useState } from 'react';
import IconButton from '~/core/ui/IconButton';
import If from '~/core/ui/If';
import UpdateMeetingModal from './UpdateMeetingModal';
import type Meeting from '~/lib/meetings/@types/meeting';

const UpdateMeetingButton: React.FC<{ meeting: Meeting }> = ({ meeting }) => {
  const [isUpdateMeetingOpen, setIsUpdateMeetingOpen] = useState(false);

  return (
    <>
      <IconButton
        data-cy={'update-meeting-button'}
        onClick={() => setIsUpdateMeetingOpen(true)}
      >
        <PencilSquareIcon className="dark h-6" />
      </IconButton>
      <If condition={isUpdateMeetingOpen}>
        <UpdateMeetingModal
          isOpen={isUpdateMeetingOpen}
          setIsOpen={setIsUpdateMeetingOpen}
          meeting={meeting}
        />
      </If>
    </>
  );
};

export default UpdateMeetingButton;
