import { useFirestore } from 'reactfire';
import { doc, deleteDoc } from 'firebase/firestore';
import { POSTS_COLLECTION } from '~/lib/firestore-collections';

import type { DocumentReference } from 'firebase/firestore';
import type Post from '../@types/post';
import { useCallback } from 'react';

/**
 * @name useDeletePost
 * @description Returns a stream with the posts which belong to the selected organization
 * @param organizationId
 */
function useDeletePost() {
  const firestore = useFirestore();

  const deletePostCallback = useCallback(
    (postId: string) => {
      const postRef = doc(
        firestore,
        POSTS_COLLECTION,
        postId
      ) as DocumentReference<Post>;

      return deleteDoc(postRef);
    },
    [firestore]
  );

  return deletePostCallback;
}

export default useDeletePost;
