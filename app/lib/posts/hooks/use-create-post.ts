import { useCallback } from 'react';
import { useUser } from 'reactfire';
import {
  getFirestore,
  collection,
  doc,
  writeBatch,
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
 * @name useCreatePost
 * @description Hook to create a new post
 */
function useCreatePost() {
  const user = useUser();
  const userId = user.data?.uid as string;

  const { state, setError, setData, setLoading } =
    useRequestState<WithId<Post>>();

  const createPostCallback = useCallback(
    async (postText: string, organizationId: string) => {
      const firestore = getFirestore();
      const batch = writeBatch(firestore);

      try {
        setLoading(true);

        const postsCollection = collection(firestore, POSTS_COLLECTION);

        const userDoc = doc(
          firestore,
          USERS_COLLECTION,
          userId
        ) as DocumentReference<UserData>;

        const postDoc = doc(postsCollection);

        const createdAt = serverTimestamp() as Timestamp;

        const postData = {
          postText,
          userId: userDoc.id,
          organizationId: organizationId,
          createdAt,
        };

        batch.set(postDoc, postData);

        await batch.commit();

        setData({
          id: postDoc.id,
          postText,
          userId: userDoc.id,
          organizationId: organizationId,
          createdAt,
        });
      } catch (e) {
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

export default useCreatePost;
