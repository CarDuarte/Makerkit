import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import React, { useState } from 'react';
import IconButton from '~/core/ui/IconButton';
import If from '~/core/ui/If';
import UpdatePostModal from './UpdatePostModal';
import type Post from '~/lib/posts/@types/post';

const UpdatePostButton: React.FC<{ post: Post }> = ({ post }) => {
  const [isUpdatePostOpen, setIsUpdatePostOpen] = useState(false);

  return (
    <>
      <IconButton
        data-cy={'update-post-button'}
        onClick={() => setIsUpdatePostOpen(true)}
      >
        <PencilSquareIcon className="dark h-6" />
      </IconButton>
      <If condition={isUpdatePostOpen}>
        <UpdatePostModal
          isOpen={isUpdatePostOpen}
          setIsOpen={setIsUpdatePostOpen}
          post={post}
        />
      </If>
    </>
  );
};

export default UpdatePostButton;
