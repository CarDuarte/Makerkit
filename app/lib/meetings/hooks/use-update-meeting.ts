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
  MEETINGS_COLLECTION,
  USERS_COLLECTION,
} from '~/lib/firestore-collections';

import type { FirebaseError } from 'firebase/app';
import type { DocumentReference, Timestamp } from 'firebase/firestore';
import type Meeting from '../@types/meeting';
import type UserData from '~/core/session/types/user-data';

/**
 * @name useUpdateMeeting
 * @description Update a meeting
 * @param meetingId
 */
function useUpdateMeeting() {
  const user = useUser();
  const userId = user.data?.uid as string;

  const { state, setError, setData, setLoading } =
    useRequestState<WithId<Meeting>>();

  const createMeetingCallback = useCallback(
    async (meetingId: string, meetingText: string, organizationId: string) => {
      const firestore = getFirestore();

      try {
        setLoading(true);

        const meetingsCollection = collection(firestore, MEETINGS_COLLECTION);

        const userDoc = doc(
          firestore,
          USERS_COLLECTION,
          userId
        ) as DocumentReference<UserData>;

        const meetingDoc = doc(meetingsCollection, `/${meetingId}`);

        const updatedAt = serverTimestamp() as Timestamp;

        const meetingData = {
          meetingText,
          userId: userDoc.id,
          
        };

        updateDoc(meetingDoc, meetingData);

        setData({
          id: meetingDoc.id,
          meetingText,
          userId: userDoc.id,
          organizationId: organizationId,
        });
      } catch (e) {
        console.error((e as FirebaseError).message);
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

export default useUpdateMeeting;
