import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import ThreadDetail from '@/components/ThreadDetailCard';
import Loader from '@/components/Loader';
import {threadThunks} from '@/store/thread/action';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';

function ThreadDetailPage() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const thread = useSelector((state) => state.thread);

  useEffect(() => {
    dispatch(threadThunks.asyncGetThread(id));
  }, [dispatch, id]);

  const onUpVoteThreadHandler = (id) => {
    dispatch(threadThunks.asyncUpVoteThread(id));
  };

  const onDownVoteThreadHandler = (id) => {
    dispatch(threadThunks.asyncDownVoteThread(id));
  };

  const onUpVoteCommentHandler = (id) => {
    dispatch(threadThunks.asyncUpVoteComment(id));
  };

  const onDownVoteCommentHandler = (id) => {
    dispatch(threadThunks.asyncDownVoteComment(id));
  };

  const handleSubmitComment = (content) => {
    dispatch(threadThunks.asyncCreateComment(content));
  };
  return (
    <>
      {!thread ?
        (
          <Loader />
          ) :
        (
          <>
            <ThreadDetail
              auth={auth}
              data={thread}
              upVote={onUpVoteThreadHandler}
              downVote={onDownVoteThreadHandler}
            />
            <CommentForm
              onSubmit={handleSubmitComment}
              auth={auth}
            />
            <CommentList
              data={thread.comments}
              auth={auth}
              upVote={onUpVoteCommentHandler}
              downVote={onDownVoteCommentHandler}
            />
          </>

          )}

    </>
  );
}

export default ThreadDetailPage;
