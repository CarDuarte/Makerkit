import React, { useCallback, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import useCreatePost from '~/lib/posts/hooks/use-create-post';
import OrganizationContext from '~/lib/contexts/organization';

const CreatePostForm: React.FC<{}> = () => {
  const { organization } = useContext(OrganizationContext);
  const [createPost, createPostState] = useCreatePost();
  const { loading } = createPostState;
  const { t } = useTranslation();
  const postText = '';

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      postText: postText,
    },
  });

  const postTextControl = register('postText', {
    required: true,
  });

  // Report error when user leaves input empty
  const onError = useCallback(() => {
    toast.error(`Please write some text to post`);
  }, []);

  const onSubmit = async (postText: string) => {
    const isTextInvalid = !postText;
    if (isTextInvalid) {
      return onError();
    }

    await toast.promise(createPost(postText, organization?.id as string), {
      success: t<string>(`post:createPostSuccess`),
      error: t<string>(`post:createPostError`),
      loading: t<string>(`post:createPostLoading`),
    });

    reset({
      postText: '',
    });
  };

  useEffect(() => {
    reset({
      postText: postText ?? '',
    });
  }, [postText, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.postText);
        })}
        className={'space-y-4'}
      >
        <div className={'flex items-end space-y-4'}>
          <div className={'ml-1 mr-2 flex-auto'}>
            <TextField>
              <TextField.Label>
                <Trans i18nKey={'post:postTextInputLabel'} />
                <TextField.Input
                  data-cy={'post-text-input'}
                  required
                  name={postTextControl.name}
                  innerRef={postTextControl.ref}
                  onChange={postTextControl.onChange}
                  onBlur={postTextControl.onBlur}
                  placeholder={'ex. Hello you guys! I am doing this today!'}
                />
              </TextField.Label>
            </TextField>
          </div>
          <div className={'ml-1 mr-2 flex-initial pb-1'}>
            <Button
              className={'w-full md:w-auto'}
              data-cy={'create-post-submit-button'}
              loading={loading}
            >
              <Trans i18nKey={'post:createPostSubmitLabel'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
