import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import { FooterButtons, FooterDroppableContainer } from './StyledComponents';

const DraggableViews = () => {
  const [views, setViews] = useState([
    { icon: Icons.faEnvelope, label: 'Email' },
    { icon: Icons.faListUl, label: 'Tasks' },
    { icon: Icons.faHome, label: 'Properties' },
    { icon: Icons.faCompactDisc, label: 'CD' },
    { icon: Icons.faFile, label: 'Docs' }
  ]);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const removed = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed[0]);

    return result;
  };

  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const newViews = reorder(
      views,
      result.source.index,
      result.destination.index
    );

    setViews(newViews);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="footerList" direction="horizontal">
        {provided => (
          <FooterDroppableContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {views.map((x, idx) => {
              const showActive =
                x.label === 'Email' || x.label === 'Properties';
              return (
                <Draggable
                  key={`${x.label}-${idx}`}
                  draggableId={x.label}
                  index={idx}
                >
                  {provided => (
                    <FooterButtons
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mr-1 ${showActive && 'active'}`}
                    >
                      <FontAwesomeIcon icon={x.icon} className="mr-2" />
                      {x.label}
                    </FooterButtons>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </FooterDroppableContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableViews;
