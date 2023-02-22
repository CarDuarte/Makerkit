import AppHeader from '~/components/AppHeader';
import AppContainer from '~/components/AppContainer';
import ClientOnly from '~/core/ui/ClientOnly';
import Heading from '~/core/ui/Heading';
import { Trans } from 'react-i18next';
import CreatePostForm from '~/components/posts/CreatePostForm';
import ListPosts from '~/components/posts/ListPosts';

function PostsPage() {
  return (
    <>
      <AppHeader>
        <Trans i18nKey={'common:postsTabLabel'} />
      </AppHeader>
      <ClientOnly>
        <AppContainer>
          <div className={'flex flex-col space-y-6 pb-36'}>
            <Heading type={3}>
              <Trans i18nKey={'post:postsInstructions'} />
            </Heading>
            <CreatePostForm />
            <ListPosts />
          </div>
        </AppContainer>
      </ClientOnly>
    </>
  );
}

export default PostsPage;
