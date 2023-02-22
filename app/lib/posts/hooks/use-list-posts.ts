import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { POSTS_COLLECTION } from '~/lib/firestore-collections';

import type { CollectionReference } from 'firebase/firestore';
import type Post from '../@types/post';

/**
 * @name useListPosts
 * @description Returns a stream with the posts which belong to the selected organization
 * @param organizationId
 */
function useListPosts(organizationId: string) {
  const firestore = useFirestore();

  const postsCollection = collection(
    firestore,
    POSTS_COLLECTION
  ) as CollectionReference<Post>;

  const postQuery = query(
    postsCollection,
    where('organizationId', '==', organizationId),
    orderBy('createdAt', 'asc')
  );

  return useFirestoreCollectionData(postQuery, {
    initialData: [],
    idField: 'id',
  });
}

export default useListPosts;
