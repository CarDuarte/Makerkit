import React, { useCallback, useState } from 'react';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import IconButton from '~/core/ui/IconButton';
import useDeleteMeeting from '~/lib/meetings/hooks/use-delete-meeting';
import { Trans, useTranslation } from 'react-i18next';
import toaster from 'react-hot-toast';
import If from '~/core/ui/If';
import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';

const DeleteMeetingButton: React.FCC<{
  meetingId: string;
}> = ({ meetingId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteMeetingRequest = useDeleteMeeting();
  const { t } = useTranslation();

  const onMeetingDeletedRequest = useCallback(async () => {
    const promise = deleteMeetingRequest(meetingId);

    await toaster.promise(promise, {
      success: t<string>(`meeting:deleteMeetingSuccessMessage`),
      error: t<string>(`meeting:deleteMeetingErrorMessage`),
      loading: t<string>(`meeting:deleteMeetingLoadingMessage`),
    });

    setIsDeleting(false);
  }, [deleteMeetingRequest, meetingId, t]);

  return (
    <>
      <IconButton
        data-cy={'delete-meeting-button'}
        onClick={() => setIsDeleting(true)}
      >
        <TrashIcon className="dark h-6" />
      </IconButton>
      <If condition={isDeleting}>
        <Modal
          heading={<Trans i18nKey={'meeting:deleteMeetingModalHeading'} />}
          isOpen={isDeleting}
          setIsOpen={setIsDeleting}
        >
          <div className={'flex flex-col space-y-4'}>
            <p>
              <Trans i18nKey={'common:modalConfirmationQuestion'} />
            </p>
            <Button
              data-cy={'confirm-delete-meeting-button'}
              color={'danger'}
              onClick={onMeetingDeletedRequest}
            >
              <Trans i18nKey={'meeting:deleteMeetingSubmitLabel'} />
            </Button>
          </div>
        </Modal>
      </If>
    </>
  );
};

export default DeleteMeetingButton;
