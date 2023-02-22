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
  MEETINGS_COLLECTION,
  USERS_COLLECTION,
} from '~/lib/firestore-collections';

import type { FirebaseError } from 'firebase/app';
import type { DocumentReference, Timestamp } from 'firebase/firestore';
import type Meeting from '../@types/meeting';
import type UserData from '~/core/session/types/user-data';

/**
 * @name useCreateMeeting
 * @description Hook to create a new meeting
 */
function useCreateMeeting() {
  const user = useUser();
  const userId = user.data?.uid as string;

  const { state, setError, setData, setLoading } =
    useRequestState<WithId<Meeting>>();

  const createMeetingCallback = useCallback(
    async (meetingText: string, organizationId: string) => {
      const firestore = getFirestore();
      const batch = writeBatch(firestore);

      try {
        setLoading(true);

        const meetingsCollection = collection(firestore, MEETINGS_COLLECTION);

        const userDoc = doc(
          firestore,
          USERS_COLLECTION,
          userId
        ) as DocumentReference<UserData>;

        const meetingDoc = doc(meetingsCollection);

       

        const meetingData = {
          meetingText,
          userId: userDoc.id,
          organizationId: organizationId,
        };

        batch.set(meetingDoc, meetingData);

        await batch.commit();

        setData({
          id: meetingDoc.id,
          meetingText,
          userId: userDoc.id,
          organizationId: organizationId,
        });
      } catch (e) {
        setError((e as FirebaseError).message);
      }
    },
    [setData, setError, setLoading, userId]
  );

  return [createMeetingCallback, state] as [
    typeof createMeetingCallback,
    typeof state
  ];
}

export default useCreateMeeting;
