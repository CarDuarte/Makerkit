import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { MEETINGS_COLLECTION } from '~/lib/firestore-collections';

import type { CollectionReference } from 'firebase/firestore';
import type Meeting from '../@types/meeting';

/**
 * @name useListMeetings
 * @description Returns a stream with the posts which belong to the selected organization
 * @param organizationId
 */
function useListMeetings(organizationId: string) {
  const firestore = useFirestore();

  const meetingsCollection = collection(
    firestore,
    MEETINGS_COLLECTION
  ) as CollectionReference<Meeting>;

  const meetingQuery = query(
    meetingsCollection,
    where('organizationId', '==', organizationId)
  );

  return useFirestoreCollectionData(meetingQuery, {
    initialData: [],
    idField: 'id',
  });
}

export default useListMeetings;
