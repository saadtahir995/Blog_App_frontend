import React from 'react';
import { formatDistanceToNow } from 'date-fns';
const PostedTime = ({ publishDate }) => {
  const distance = formatDistanceToNow(new Date(publishDate), { addSuffix: true });

  return <span>{distance}</span>;
};

export default PostedTime;
