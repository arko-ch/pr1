import React, { useState } from 'react';
import {
  CommentInput as Input,
  SaveLink,
  ButtonLinkRed
} from '../EmailStyledComponents';
import { Container, EmailBlueButton } from '../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';
import { Col } from 'reactstrap';

const CommentInput = ({
  setAddNewComment,
  isEdit,
  value,
  handleNewComment,
  isNew,
  handleUpdateComment,
  commentId,
  handleDeleteComment,
  idx
}) => {
  const [comment, setComment] = useState(value ? value : '');

  return (
    <>
      <Container className="pl-4 pr-4 mt-2 mb-1">
        <Col xs={12} md={1}></Col>
        <Col xs={12} md={11}>
          <Input
            placeholder="Write a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Col>
      </Container>
      <Container className=" pl-4 pr-4 mt-2 mb-2">
        <Col xs={12} md={1}></Col>
        <Col xs={12} md={11}>
          <Container>
            <Col xs={6} className="p-0">
              {isEdit && (
                <ButtonLinkRed
                  onClick={() => handleDeleteComment(commentId, idx)}
                >
                  <FontAwesomeIcon icon={Icons.faTrashAlt} className="mr-1" />{' '}
                  Delete
                </ButtonLinkRed>
              )}
            </Col>
            <Col xs={6} className="p-0 align-right">
              <SaveLink onClick={() => setAddNewComment(false)}>
                Cancel
              </SaveLink>
              <EmailBlueButton
                disabled={!comment}
                onClick={() =>
                  isNew
                    ? handleNewComment(comment)
                    : handleUpdateComment(commentId, comment)
                }
              >
                {isEdit && 'Save Changes'}
                {!isEdit && 'Comment'}
              </EmailBlueButton>
            </Col>
          </Container>
        </Col>
      </Container>
    </>
  );
};

export default CommentInput;
