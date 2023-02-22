import { useCallback } from 'react';
import { useUser } from 'reactfire';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import useRequestState from '~/core/hooks/use-request-state';
import {
  POSTS_COLLECTION,
  USERS_COLLECTION,
} from '~/lib/firestore-collections';

import type { FirebaseError } from 'firebase/app';
import type { DocumentReference, Timestamp } from 'firebase/firestore';
import type Post from '../@types/post';
import type UserData from '~/core/session/types/user-data';

/**
 * @name useUpdatePost
 * @description Update a post
 * @param postId
 */
function useUpdatePost() {
  const user = useUser();
  const userId = user.data?.uid as string;

  const { state, setError, setData, setLoading } =
    useRequestState<WithId<Post>>();

  const createPostCallback = useCallback(
    async (postId: string, postText: string, organizationId: string) => {
      const firestore = getFirestore();

      try {
        setLoading(true);

        const postsCollection = collection(firestore, POSTS_COLLECTION);

        const userDoc = doc(
          firestore,
          USERS_COLLECTION,
          userId
        ) as DocumentReference<UserData>;

        const postDoc = doc(postsCollection, `/${postId}`);

        const updatedAt = serverTimestamp() as Timestamp;

        const postData = {
          postText,
          userId: userDoc.id,
          updatedAt,
        };

        updateDoc(postDoc, postData);

        setData({
          id: postDoc.id,
          postText,
          userId: userDoc.id,
          organizationId: organizationId,
          updatedAt,
        });
      } catch (e) {
        console.error((e as FirebaseError).message);
        setError((e as FirebaseError).message);
      }
    },
    [setData, setError, setLoading, userId]
  );

  return [createPostCallback, state] as [
    typeof createPostCallback,
    typeof state
  ];
}

export default useUpdatePost;
