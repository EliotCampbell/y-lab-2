import React, {memo, useState} from 'react';
import { cn } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

const cnCommentReply = cn("ReplyField");

const ReplyField = ({t, title, parent, submitComment, resetEntityForComment}) => {
  const [commentText, setCommentText] = useState('');

  return (
    <form className={cnCommentReply()}>
      <p className={cnCommentReply("title")}>{title}</p>
      <textarea
        className={cnCommentReply("replyArea")}
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      />
      <button
        className={cnCommentReply("button")}
        onClick={() => submitComment(commentText, {
          _id: parent._id,
          _type: parent._type
        })}
      >
        {t('replyField.submit')}
      </button>
      {parent._type !== 'article' && (
        resetEntityForComment && <button
          className={cnCommentReply("button")}
          onClick={() => resetEntityForComment()}
        >
          {t('replyField.cancel')}
        </button>
      )}
    </form>
  )
};

ReplyField.propTypes = {
  title: PropTypes.string,
  parent: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.string,
  }),
  submitComment: PropTypes.func,
  resetEntityForComment: PropTypes.func,
  t: PropTypes.func
};

ReplyField.defaultProps = {
  title: '-default-',
  parent: {_id: '', _type: ''},
  t: (text) => text,
  submitComment: () => {},
};

export default memo(ReplyField);