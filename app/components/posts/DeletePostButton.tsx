import React, { useCallback, useState } from 'react';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import IconButton from '~/core/ui/IconButton';
import useDeletePost from '~/lib/posts/hooks/use-delete-post';
import { Trans, useTranslation } from 'react-i18next';
import toaster from 'react-hot-toast';
import If from '~/core/ui/If';
import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';

const DeletePostButton: React.FCC<{
  postId: string;
}> = ({ postId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePostRequest = useDeletePost();
  const { t } = useTranslation();

  const onPostDeletedRequest = useCallback(async () => {
    const promise = deletePostRequest(postId);

    await toaster.promise(promise, {
      success: t<string>(`post:deletePostSuccessMessage`),
      error: t<string>(`post:deletePostErrorMessage`),
      loading: t<string>(`post:deletePostLoadingMessage`),
    });

    setIsDeleting(false);
  }, [deletePostRequest, postId, t]);

  return (
    <>
      <IconButton
        data-cy={'delete-post-button'}
        onClick={() => setIsDeleting(true)}
      >
        <TrashIcon className="dark h-6" />
      </IconButton>
      <If condition={isDeleting}>
        <Modal
          heading={<Trans i18nKey={'post:deletePostModalHeading'} />}
          isOpen={isDeleting}
          setIsOpen={setIsDeleting}
        >
          <div className={'flex flex-col space-y-4'}>
            <p>
              <Trans i18nKey={'common:modalConfirmationQuestion'} />
            </p>
            <Button
              data-cy={'confirm-delete-post-button'}
              color={'danger'}
              onClick={onPostDeletedRequest}
            >
              <Trans i18nKey={'post:deletePostSubmitLabel'} />
            </Button>
          </div>
        </Modal>
      </If>
    </>
  );
};

export default DeletePostButton;
