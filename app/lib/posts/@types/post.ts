import type { Timestamp } from 'firebase/firestore';

export default interface Post {
  id?: string;
  postText: string;
  userId: string;
  organizationId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
