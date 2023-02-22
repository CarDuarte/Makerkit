import React, { useCallback, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import useCreateMeeting from '~/lib/meetings/hooks/use-create-meeting';
import OrganizationContext from '~/lib/contexts/organization';

const CreateMeetingForm: React.FC<{}> = () => {
  const { organization } = useContext(OrganizationContext);
  const [createMeeting, createMeetingState] = useCreateMeeting();
  const { loading } = createMeetingState;
  const { t } = useTranslation();
  const meetingText = '';

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      meetingText: meetingText,
    },
  });

  const meetingTextControl = register('meetingText', {
    required: true,
  });

  const onError = useCallback(() => {
    toast.error(`Please write some text on the meeting`);
  }, []);

  const onSubmit = async (meetingText: string) => {
    const isTextInvalid = !meetingText;
    if (isTextInvalid) {
      return onError();
    }

    await toast.promise(createMeeting(meetingText, organization?.id as string), {
        success: t<string>(`Create meeting success`),
        error: t<string>(`Create meeting error`),
        loading: t<string>(`Create meeting loading`),
      });

      reset({
        meetingText: '',
      });
    };

    useEffect(() => {
        reset({
          meetingText: meetingText ?? '',
        });
      }, [meetingText, reset]);

    return(
      <>
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.meetingText);
        })}
        className={'space-y-4'}
      >
        <div className={'flex items-end space-y-4'}>
          <div className={'ml-1 mr-2 flex-auto'}>
            <TextField>
              <TextField.Label>
                <Trans i18nKey={'meeting:meetingTextInputLabel'} />
                <TextField.Input
                  data-cy={'meeting-text-input'}
                  required
                  name={meetingTextControl.name}
                  innerRef={meetingTextControl.ref}
                  onChange={meetingTextControl.onChange}
                  onBlur={meetingTextControl.onBlur}
                  placeholder={'ex. Hello you guys! I am doing this today!'}
                />
              </TextField.Label>
            </TextField>
          </div>
          <div className={'ml-1 mr-2 flex-initial pb-1'}>
            <Button
              className={'w-full md:w-auto'}
              data-cy={'create-meeting-submit-button'}
              loading={loading}
            >
              <Trans i18nKey={'meeting:createMeetingSubmitLabel'} />
            </Button>
          </div>
        </div>
      </form>
    </>
    )
}


export default CreateMeetingForm;