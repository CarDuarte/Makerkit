import React, { useCallback, useContext, useEffect } from 'react';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import { useTranslation, Trans } from 'react-i18next';
import type Post from '~/lib/posts/@types/post';
import { useForm } from 'react-hook-form';
import useUpdatePost from '~/lib/posts/hooks/use-update-post';
import toast from 'react-hot-toast';
import OrganizationContext from '~/lib/contexts/organization';

const UpdatePostModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => unknown;
  post: Post;
}> = ({ isOpen, setIsOpen, post }) => {
  const { organization } = useContext(OrganizationContext);
  const { t } = useTranslation();
  const currentPostText = post.postText ?? '';
  const [updatePost, updatePoststate] = useUpdatePost();
  const { loading } = updatePoststate;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      postText: currentPostText,
    },
  });

  const postTextControl = register('postText', { value: currentPostText });

  const onError = useCallback(() => {
    toast.error(`Please write some text to post`);
  }, []);

  const onSubmit = async (postText: string) => {
    const isTextInvalid = !postText;
    if (isTextInvalid) {
      return onError();
    }

    await toast.promise(
      updatePost(post.id as string, postText, organization?.id as string),
      {
        success: () => {
          setIsOpen(false);
          return t<string>(`post:updatePostSuccess`);
        },
        error: t<string>(`post:updatePostError`),
        loading: t<string>(`post:updatePostLoading`),
      }
    );
  };

  useEffect(() => {
    reset({
      postText: currentPostText,
    });
  }, [currentPostText, reset]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      heading={t<string>('post:updatePostModalHeading')}
    >
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.postText);
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'post:postTextInputLabel'} />
              <TextField.Input
                data-cy={'update-post-text-input'}
                required
                name={postTextControl.name}
                innerRef={postTextControl.ref}
                onChange={postTextControl.onChange}
                onBlur={postTextControl.onBlur}
              />
            </TextField.Label>
          </TextField>
          <Button
            data-cy={'update-post-submit-button'}
            className={'w-full md:w-auto'}
            loading={loading}
          >
            <Trans i18nKey={'post:updatePostSubmitLabel'} />
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdatePostModal;
