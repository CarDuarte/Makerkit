import React, { useCallback, useContext, useEffect } from 'react';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import { useTranslation, Trans } from 'react-i18next';
import type Meeting from '~/lib/meetings/@types/meeting';
import { useForm } from 'react-hook-form';
import useUpdateMeeting from '~/lib/meetings/hooks/use-update-meeting';
import toast from 'react-hot-toast';
import OrganizationContext from '~/lib/contexts/organization';

const UpdateMeetingModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
  meeting: Meeting;
}> = ({ isOpen, setIsOpen, meeting }) => {
  const { organization } = useContext(OrganizationContext);
  const { t } = useTranslation();
  const currentMeetingText = meeting.meetingText ?? '';
  const [updateMeeting, updateMeetingstate] = useUpdateMeeting();
  const { loading } = updateMeetingstate;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      meetingText: currentMeetingText,
    },
  });

  const meetingTextControl = register('meetingText', { value: currentMeetingText });

  const onError = useCallback(() => {
    toast.error(`Please write some text to meeting`);
  }, []);

  const onSubmit = async (meetingText: string) => {
    const isTextInvalid = !meetingText;
    if (isTextInvalid) {
      return onError();
    }

    await toast.promise(
      updateMeeting(meeting.id as string, meetingText, organization?.id as string),
      {
        success: () => {
          setIsOpen(false);
          return t<string>(`meeting:updateMeetingSuccess`);
        },
        error: t<string>(`meeting:updateMeetingError`),
        loading: t<string>(`meeting:updateMeetingLoading`),
      }
    );
  };

  useEffect(() => {
    reset({
      meetingText: currentMeetingText,
    });
  }, [currentMeetingText, reset]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      heading={t<string>('meeting:updateMeetingModalHeading')}
    >
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.meetingText);
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'meeting:meetingTextInputLabel'} />
              <TextField.Input
                data-cy={'update-meeting-text-input'}
                required
                name={meetingTextControl.name}
                innerRef={meetingTextControl.ref}
                onChange={meetingTextControl.onChange}
                onBlur={meetingTextControl.onBlur}
              />
            </TextField.Label>
          </TextField>
          <Button
            data-cy={'update-meeting-submit-button'}
            className={'w-full md:w-auto'}
            loading={loading}
          >
            <Trans i18nKey={'meeting:updateMeetingSubmitLabel'} />
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateMeetingModal;
