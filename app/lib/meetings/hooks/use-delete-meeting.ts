import { useFirestore } from 'reactfire';
import { doc, deleteDoc } from 'firebase/firestore';
import { MEETINGS_COLLECTION } from '~/lib/firestore-collections';

import type { DocumentReference } from 'firebase/firestore';
import type Meeting from '../@types/meeting';
import { useCallback } from 'react';

/**
 * @name useDeleteMeeting
 * @description Returns a stream with the meetings which belong to the selected organization
 * @param organizationId
 */
function useDeleteMeeting() {
  const firestore = useFirestore();

  const deleteMeetingCallback = useCallback(
    (meetingId: string) => {
      const postRef = doc(
        firestore,
        MEETINGS_COLLECTION,
        meetingId
      ) as DocumentReference<Meeting>;

      return deleteDoc(postRef);
    },
    [firestore]
  );

  return deleteMeetingCallback;
}

export default useDeleteMeeting;
