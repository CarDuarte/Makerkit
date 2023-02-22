import React, { useContext } from 'react';
import OrganizationContext from '~/lib/contexts/organization';
import useListPosts from '~/lib/posts/hooks/use-list-posts';
import Tile from '~/core/ui/Tile';
import If from '~/core/ui/If';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import Alert from '~/core/ui/Alert';
import { Trans } from 'react-i18next';
import formatDistance from 'date-fns/formatDistance';
import DeletePostButton from './DeletePostButton';
import UpdatePostButton from './UpdatePostButton';

const ListPosts: React.FC<{}> = () => {
  const { organization } = useContext(OrganizationContext);
  const {
    data: posts,
    status,
    error,
  } = useListPosts(organization?.id as string);

  if (status === 'loading') {
    return <SubHeading>Loading ... </SubHeading>;
  }

  if (status === 'error') {
    return (
      <Alert type={'error'}>
        <Trans i18nKey={'post:loadPostsError'} />
        <span>{error?.message}</span>
      </Alert>
    );
  }

  return (
    <div
      className={
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3' +
        ' xl:grid-cols-4'
      }
    >
      <If condition={status === 'success'}>
        {posts.map((post) => {
          return (
            <Tile key={post.id}>
              <Heading type={4}>
                <div className={'flex justify-center text-center '}>
                  <span>{post.postText}</span>
                </div>
              </Heading>
              <Tile.Body>
                <span className="text-center text-sm font-light font-normal text-gray-800 dark:text-gray-400">
                  {`Created ${formatDistance(
                    post.createdAt?.toDate() || new Date(),
                    new Date(),
                    { addSuffix: true }
                  )}`}
                </span>
                <div className="flex justify-around">
                  <div className="flex-initial">
                    <UpdatePostButton post={post} />
                  </div>
                  <div className="flex-initial">
                    <DeletePostButton postId={post.id as string} />
                  </div>
                </div>
              </Tile.Body>
            </Tile>
          );
        })}
      </If>
    </div>
  );
};

export default ListPosts;
